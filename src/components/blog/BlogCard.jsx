import { createBlogPostUrl } from '@/utils';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function BlogCard({ post }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <a href={createBlogPostUrl(post.slug)} className="relative overflow-hidden aspect-video block">
        <img 
          src={post.cover_image || post.image_url || "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800"} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
            {post.category}
          </span>
        </div>
      </a>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(post.created_date || Date.now()), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          <a href={createBlogPostUrl(post.slug)}>
            {post.title}
          </a>
        </h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          <Button variant="link" className="p-0 h-auto text-green-600 font-semibold group/btn" asChild>
            <a href={createBlogPostUrl(post.slug)}>
              Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}