import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, loading } = useBlogPosts('published');

  const post = posts.find(p => String(p.id) === String(id));

  if (loading) {
    return <div className="max-w-3xl mx-auto py-24 text-center text-lg">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-3xl mx-auto py-24 text-center text-lg">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0 py-24">
      <button onClick={() => navigate(-1)} className="flex items-center mb-8 text-forest-green hover:text-sage-green font-montserrat font-semibold">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back
      </button>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="flex items-center space-x-6 mb-6 text-gray-500 font-montserrat">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{post.author || 'Admin'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
        <h1 className="font-merriweather font-bold text-4xl text-charcoal mb-6 leading-tight">{post.title}</h1>
        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="font-montserrat text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {post.content || post.excerpt}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 