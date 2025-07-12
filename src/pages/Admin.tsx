import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, Eye, Calendar, User } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAuth } from '../hooks/useAuth';

const Admin: React.FC = () => {
  const { posts, loading, deletePost, updatePost } = useBlogPosts();
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setDeletingId(id);
        await deletePost(id);
      } catch (error) {
        alert('Failed to delete post');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: 'published' | 'draft') => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await updatePost(id, { status: newStatus });
    } catch (error) {
      alert('Failed to update post status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="font-merriweather font-bold text-4xl text-charcoal mb-4">
            Access Denied
          </h1>
          <p className="font-montserrat text-gray-600 text-lg">
            Please sign in to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <div>
          <h1 className="font-merriweather font-bold text-4xl text-charcoal mb-4">
            Blog Admin
          </h1>
          <p className="font-montserrat text-gray-600 text-lg">
            Manage your blog posts and content
          </p>
        </div>
        <Link
          to="/admin/write"
          className="flex items-center space-x-2 bg-forest-green hover:bg-sage-green text-white font-montserrat font-semibold px-6 py-3 rounded-xl transition-colors duration-300 mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-montserrat text-gray-500 text-sm">Total Posts</p>
              <p className="font-merriweather font-bold text-3xl text-charcoal">
                {loading ? '...' : posts.length}
              </p>
            </div>
            <div className="p-3 bg-forest-green/10 rounded-xl">
              <Edit3 className="h-6 w-6 text-forest-green" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-montserrat text-gray-500 text-sm">Published</p>
              <p className="font-merriweather font-bold text-3xl text-charcoal">
                {loading ? '...' : posts.filter(p => p.status === 'published').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-montserrat text-gray-500 text-sm">Drafts</p>
              <p className="font-merriweather font-bold text-3xl text-charcoal">
                {loading ? '...' : posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Edit3 className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="font-merriweather font-bold text-2xl text-charcoal">
            All Posts
          </h2>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Edit3 className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="font-merriweather font-bold text-2xl text-gray-600 mb-4">
              No Posts Yet
            </h3>
            <p className="font-montserrat text-gray-500 mb-8">
              Start creating your first blog post to share your mindful insights.
            </p>
            <Link
              to="/admin/write"
              className="inline-flex items-center space-x-2 bg-forest-green hover:bg-sage-green text-white font-montserrat font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-8 font-montserrat font-semibold text-gray-600">Post</th>
                  <th className="text-left py-4 px-8 font-montserrat font-semibold text-gray-600">Category</th>
                  <th className="text-left py-4 px-8 font-montserrat font-semibold text-gray-600">Date</th>
                  <th className="text-left py-4 px-8 font-montserrat font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-8 font-montserrat font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-4">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-montserrat font-semibold text-charcoal mb-1">
                            {post.title}
                          </h3>
                          <p className="font-montserrat text-gray-500 text-sm line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="bg-forest-green/10 text-forest-green px-3 py-1 rounded-full font-montserrat text-sm font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="font-montserrat text-sm">{formatDate(post.created_at)}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <button
                        onClick={() => toggleStatus(post.id, post.status)}
                        className={`px-3 py-1 rounded-full font-montserrat text-sm font-medium transition-colors duration-200 ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/blog/${post.id}`)}
                          className="p-2 text-gray-500 hover:text-forest-green hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/write/${post.id}`)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;