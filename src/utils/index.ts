


/**
 * Builds canonical, lowercase public paths.
 */
export function createPageUrl(pageName: string) {
    const slug = pageName.trim().replace(/ /g, '-').toLowerCase();
    return slug === 'home' ? '/' : `/${slug}`;
}

/**
 * Builds clean URL for a blog post: /blog/{slug}
 */
export function createBlogPostUrl(slug: string) {
    return `/blog/${slug}`;
}
