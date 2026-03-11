import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useState, useEffect } from "react";

/**
 * useBlogPosts - Fetches blog posts from base44 + static blog-data.json
 * Merges both sources into unified post array
 */
export function useBlogPosts() {
    const [staticPosts, setStaticPosts] = useState([]);
    const [staticLoading, setStaticLoading] = useState(true);
    const [staticError, setStaticError] = useState(null);

    // Load static blog data from public/blog-data.json
    useEffect(() => {
        const fetchStaticPosts = async () => {
            try {
                const response = await fetch('/blog-data.json');
                if (!response.ok) throw new Error('Failed to load static blog data');
                const data = await response.json();
                setStaticPosts(data.posts || []);
                setStaticLoading(false);
            } catch (err) {
                setStaticError(err);
                setStaticLoading(false);
                // Fail gracefully - continue with base44 posts only
            }
        };
        fetchStaticPosts();
    }, []);

    // Load base44 posts
    const { data: base44Posts = [], isLoading: base44Loading, error: base44Error } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => base44.entities.BlogPost.list({ sort: { created_date: -1 } }),
    });

    // Merge posts: static posts first (featured), then base44 posts
    const mergedPosts = [
        ...staticPosts.filter(p => p.published !== false),
        ...base44Posts.filter(p => p.published !== false)
    ];

    // Sort by created_date descending
    const sortedPosts = mergedPosts.sort((a, b) => 
        new Date(b.created_date) - new Date(a.created_date)
    );

    return {
        posts: sortedPosts,
        isLoading: staticLoading || base44Loading,
        error: staticError || base44Error,
    };
}
