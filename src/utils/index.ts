


/**
 * Builds URL path for a page. Preserves case to match React Router paths
 * (e.g. /Blog, /BlogPost, /pasadena-landscaping).
 */
export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}

/**
 * Builds clean URL for a blog post: /blog/{slug}
 */
export function createBlogPostUrl(slug: string) {
    return `/blog/${slug}`;
}