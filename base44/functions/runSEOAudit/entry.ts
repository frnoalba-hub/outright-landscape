import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Create audit record
        const audit = await base44.asServiceRole.entities.SEOAudit.create({
            audit_date: new Date().toISOString(),
            status: 'running',
            total_pages: 0,
            overall_score: 0,
            issues_critical: 0,
            issues_warning: 0,
            issues_info: 0,
            results: {}
        });

        // Get all SEO data and locations
        const [seoData, locations] = await Promise.all([
            base44.asServiceRole.entities.PageSEO.list(null, 200),
            base44.asServiceRole.entities.Location.list(null, 100)
        ]);

        // Define all pages that should exist
        const allPages = [
            { path: '/', name: 'Home', type: 'main' },
            { path: '/irrigation', name: 'Irrigation', type: 'main' },
            { path: '/blog', name: 'Blog', type: 'main' }
        ];

        // Add city pages
        const cities = [
            'arcadia', 'azusa', 'baldwin-park', 'charter-oak', 'claremont', 'covina',
            'diamond-bar', 'duarte', 'el-monte', 'glendora', 'la-verne', 'monrovia',
            'pasadena', 'pomona', 'rowland-heights', 'san-dimas', 'san-gabriel',
            'temple-city', 'walnut', 'west-covina'
        ];

        const services = ['drip-irrigation', 'irrigation-repair', 'sprinkler-repair', 'sprinkler-valves'];

        cities.forEach(city => {
            allPages.push({ path: `/${city}-landscaping`, name: `${city} Landscaping`, type: 'city' });
            services.forEach(service => {
                allPages.push({ path: `/${city}-${service}`, name: `${city} ${service}`, type: 'service' });
            });
        });

        const issues = [];
        const pageAudits = [];
        let criticalCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        // Audit each page
        for (const page of allPages) {
            const seo = seoData.find(s => s.page_path === page.path);
            const pageIssues = [];

            // Check for missing SEO data
            if (!seo) {
                pageIssues.push({
                    type: 'critical',
                    category: 'meta',
                    issue: 'Missing SEO data',
                    description: `No meta title or description defined for ${page.path}`,
                    recommendation: 'Generate SEO data using the AI generator or add manually'
                });
                criticalCount++;
            } else {
                // Check meta title
                if (!seo.meta_title) {
                    pageIssues.push({
                        type: 'critical',
                        category: 'meta',
                        issue: 'Missing meta title',
                        description: 'Page has no meta title defined',
                        recommendation: 'Add a descriptive meta title (50-60 characters)'
                    });
                    criticalCount++;
                } else if (seo.meta_title.length < 30) {
                    pageIssues.push({
                        type: 'warning',
                        category: 'meta',
                        issue: 'Meta title too short',
                        description: `Title is only ${seo.meta_title.length} characters`,
                        recommendation: 'Expand title to 50-60 characters for better SEO'
                    });
                    warningCount++;
                } else if (seo.meta_title.length > 60) {
                    pageIssues.push({
                        type: 'warning',
                        category: 'meta',
                        issue: 'Meta title too long',
                        description: `Title is ${seo.meta_title.length} characters (may be truncated)`,
                        recommendation: 'Shorten title to 60 characters or less'
                    });
                    warningCount++;
                }

                // Check meta description
                if (!seo.meta_description) {
                    pageIssues.push({
                        type: 'critical',
                        category: 'meta',
                        issue: 'Missing meta description',
                        description: 'Page has no meta description defined',
                        recommendation: 'Add a compelling meta description (150-160 characters)'
                    });
                    criticalCount++;
                } else if (seo.meta_description.length < 120) {
                    pageIssues.push({
                        type: 'warning',
                        category: 'meta',
                        issue: 'Meta description too short',
                        description: `Description is only ${seo.meta_description.length} characters`,
                        recommendation: 'Expand description to 150-160 characters'
                    });
                    warningCount++;
                } else if (seo.meta_description.length > 160) {
                    pageIssues.push({
                        type: 'info',
                        category: 'meta',
                        issue: 'Meta description slightly long',
                        description: `Description is ${seo.meta_description.length} characters`,
                        recommendation: 'Consider shortening to 160 characters'
                    });
                    infoCount++;
                }

                // Check keywords
                if (!seo.keywords || seo.keywords.length === 0) {
                    pageIssues.push({
                        type: 'warning',
                        category: 'keywords',
                        issue: 'No keywords defined',
                        description: 'Page has no target keywords',
                        recommendation: 'Add 5-10 relevant keywords for the page'
                    });
                    warningCount++;
                } else if (seo.keywords.length < 5) {
                    pageIssues.push({
                        type: 'info',
                        category: 'keywords',
                        issue: 'Few keywords',
                        description: `Only ${seo.keywords.length} keywords defined`,
                        recommendation: 'Consider adding more relevant keywords (8-12 recommended)'
                    });
                    infoCount++;
                }

                // Check for phone number in description (local SEO)
                if (seo.meta_description && !seo.meta_description.includes('626')) {
                    pageIssues.push({
                        type: 'info',
                        category: 'local-seo',
                        issue: 'No phone number in description',
                        description: 'Meta description does not include phone number',
                        recommendation: 'Consider adding (626) 343-6028 for direct calls from search'
                    });
                    infoCount++;
                }
            }

            // Check for location data for city pages
            if (page.type === 'city') {
                const citySlug = page.path.replace('/', '').replace('-landscaping', '');
                const location = locations.find(l => l.slug === citySlug);
                if (!location) {
                    pageIssues.push({
                        type: 'warning',
                        category: 'content',
                        issue: 'Missing location data',
                        description: `No Location entity found for ${citySlug}`,
                        recommendation: 'Create a Location record with FAQs and local content'
                    });
                    warningCount++;
                } else {
                    if (!location.faqs || location.faqs.length === 0) {
                        pageIssues.push({
                            type: 'info',
                            category: 'content',
                            issue: 'No FAQs defined',
                            description: 'Location has no FAQ schema data',
                            recommendation: 'Add 3-5 FAQs for rich snippet eligibility'
                        });
                        infoCount++;
                    }
                    if (!location.geo || !location.geo.latitude) {
                        pageIssues.push({
                            type: 'info',
                            category: 'local-seo',
                            issue: 'Missing geo coordinates',
                            description: 'No latitude/longitude defined',
                            recommendation: 'Add coordinates for local SEO schema'
                        });
                        infoCount++;
                    }
                }
            }

            pageAudits.push({
                path: page.path,
                name: page.name,
                type: page.type,
                hasSEO: !!seo,
                issues: pageIssues,
                score: calculatePageScore(pageIssues)
            });

            issues.push(...pageIssues.map(i => ({ ...i, page: page.path })));
        }

        // Check for duplicate titles
        const titles = seoData.filter(s => s.meta_title).map(s => s.meta_title.toLowerCase());
        const duplicateTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
        if (duplicateTitles.length > 0) {
            const uniqueDupes = [...new Set(duplicateTitles)];
            uniqueDupes.forEach(dupe => {
                const pages = seoData.filter(s => s.meta_title?.toLowerCase() === dupe);
                issues.push({
                    type: 'critical',
                    category: 'duplicate',
                    issue: 'Duplicate meta title',
                    description: `Title "${dupe.substring(0, 50)}..." used on ${pages.length} pages`,
                    recommendation: 'Each page should have a unique meta title',
                    pages: pages.map(p => p.page_path)
                });
                criticalCount++;
            });
        }

        // Check for duplicate descriptions
        const descriptions = seoData.filter(s => s.meta_description).map(s => s.meta_description.toLowerCase());
        const duplicateDescs = descriptions.filter((d, i) => descriptions.indexOf(d) !== i);
        if (duplicateDescs.length > 0) {
            const uniqueDupes = [...new Set(duplicateDescs)];
            uniqueDupes.forEach(dupe => {
                const pages = seoData.filter(s => s.meta_description?.toLowerCase() === dupe);
                issues.push({
                    type: 'warning',
                    category: 'duplicate',
                    issue: 'Duplicate meta description',
                    description: `Same description used on ${pages.length} pages`,
                    recommendation: 'Each page should have a unique meta description',
                    pages: pages.map(p => p.page_path)
                });
                warningCount++;
            });
        }

        // Calculate overall score
        const totalIssues = criticalCount + warningCount + infoCount;
        const maxPossibleIssues = allPages.length * 5; // Rough estimate
        const overallScore = Math.max(0, Math.round(100 - (criticalCount * 10 + warningCount * 5 + infoCount * 1) / maxPossibleIssues * 100));

        // Summary statistics
        const summary = {
            totalPages: allPages.length,
            pagesWithSEO: seoData.length,
            pagesWithoutSEO: allPages.length - seoData.length,
            coveragePercent: Math.round((seoData.length / allPages.length) * 100),
            issuesByCategory: {
                meta: issues.filter(i => i.category === 'meta').length,
                keywords: issues.filter(i => i.category === 'keywords').length,
                content: issues.filter(i => i.category === 'content').length,
                duplicate: issues.filter(i => i.category === 'duplicate').length,
                localSeo: issues.filter(i => i.category === 'local-seo').length
            }
        };

        // Update audit record
        await base44.asServiceRole.entities.SEOAudit.update(audit.id, {
            status: 'completed',
            total_pages: allPages.length,
            overall_score: overallScore,
            issues_critical: criticalCount,
            issues_warning: warningCount,
            issues_info: infoCount,
            results: {
                summary,
                issues: issues.slice(0, 100), // Limit stored issues
                pageAudits: pageAudits.slice(0, 50), // Limit stored page audits
                recommendations: generateTopRecommendations(issues)
            }
        });

        return Response.json({
            success: true,
            auditId: audit.id,
            summary,
            overallScore,
            issues: {
                critical: criticalCount,
                warning: warningCount,
                info: infoCount
            }
        });

    } catch (error) {
        console.error('SEO Audit error:', error);
        return Response.json({ 
            error: error.message || 'Failed to run SEO audit' 
        }, { status: 500 });
    }
});

function calculatePageScore(issues) {
    let score = 100;
    issues.forEach(issue => {
        if (issue.type === 'critical') score -= 25;
        else if (issue.type === 'warning') score -= 10;
        else if (issue.type === 'info') score -= 2;
    });
    return Math.max(0, score);
}

function generateTopRecommendations(issues) {
    const recommendations = [];
    
    const criticalMeta = issues.filter(i => i.type === 'critical' && i.category === 'meta');
    if (criticalMeta.length > 0) {
        recommendations.push({
            priority: 1,
            title: 'Add Missing Meta Data',
            description: `${criticalMeta.length} pages are missing essential meta titles or descriptions`,
            impact: 'High',
            effort: 'Low',
            action: 'Use the SEO Management page to generate missing meta data with AI'
        });
    }

    const duplicates = issues.filter(i => i.category === 'duplicate');
    if (duplicates.length > 0) {
        recommendations.push({
            priority: 2,
            title: 'Fix Duplicate Content',
            description: `Found ${duplicates.length} instances of duplicate titles or descriptions`,
            impact: 'High',
            effort: 'Medium',
            action: 'Review and create unique content for each page'
        });
    }

    const missingKeywords = issues.filter(i => i.category === 'keywords');
    if (missingKeywords.length > 0) {
        recommendations.push({
            priority: 3,
            title: 'Optimize Keywords',
            description: `${missingKeywords.length} pages have missing or insufficient keywords`,
            impact: 'Medium',
            effort: 'Low',
            action: 'Add targeted keywords to improve search relevance'
        });
    }

    const localSeo = issues.filter(i => i.category === 'local-seo');
    if (localSeo.length > 0) {
        recommendations.push({
            priority: 4,
            title: 'Improve Local SEO',
            description: `${localSeo.length} opportunities to enhance local search presence`,
            impact: 'Medium',
            effort: 'Low',
            action: 'Add phone numbers, geo coordinates, and local business schema'
        });
    }

    return recommendations;
}