import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../lib/supabase';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, delay = 0 }) => {
  const navigate = useNavigate();
  return (
    <article 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up group border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-montserrat font-medium text-forest-green bg-forest-green/10 px-4 py-2 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-merriweather font-bold text-2xl text-charcoal mb-4 leading-tight group-hover:text-forest-green transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="font-montserrat text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        
        <button onClick={() => navigate(`/blog/${post.id}`)} className="flex items-center space-x-2 text-forest-green hover:text-sage-green font-montserrat font-semibold transition-colors duration-200 group">
          <span>Read More</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </article>
  );
};

export default BlogCard;