import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

const WriteBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Mindfulness',
    image: '',
    status: 'draft'
  });

  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { posts, createPost, updatePost, loading: postsLoading, error: postsError } = useBlogPosts();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categories = ['Mindfulness', 'Wellness', 'Sustainability', 'Nutrition', 'Lifestyle'];

  React.useEffect(() => {
    if (id && posts.length > 0) {
      const post = posts.find(p => String(p.id) === String(id));
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          image: post.image || '',
          status: post.status
        });
      }
    }
  }, [id, posts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (id) {
        await updatePost(id, { ...formData, status });
        alert(`Post updated successfully!`);
      } else {
        await createPost({ ...formData, status });
        alert(`Post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
      }
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      if (error) throw error;
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, image: publicUrlData.publicUrl }));
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="font-merriweather font-bold text-4xl text-charcoal mb-4">
            Access Denied
          </h1>
          <p className="font-montserrat text-gray-600 text-lg">
            Please sign in to write blog posts.
          </p>
        </div>
      </div>
    );
  }

  if ((id && postsLoading)) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center text-lg">
        Loading post for editing...
      </div>
    );
  }
  if (id && posts.length > 0 && !posts.find(p => String(p.id) === String(id))) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center text-lg text-red-600">
        Post not found or you do not have permission to edit this post.
      </div>
    );
  }

  if (isPreview) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setIsPreview(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-forest-green transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-montserrat">Back to Editor</span>
          </button>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-montserrat text-sm font-medium">
            Preview Mode
          </span>
        </div>

        <article className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <div className="mb-6">
            <span className="bg-forest-green/10 text-forest-green px-4 py-2 rounded-full font-montserrat text-sm font-medium">
              {formData.category}
            </span>
          </div>
          
          {formData.image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={formData.image}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h1 className="font-merriweather font-bold text-4xl text-charcoal mb-6 leading-tight">
            {formData.title || 'Untitled Post'}
          </h1>
          
          <p className="font-montserrat text-xl text-gray-600 mb-8 leading-relaxed">
            {formData.excerpt}
          </p>
          
          <div className="font-montserrat text-gray-700 leading-relaxed whitespace-pre-wrap">
            {formData.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="flex items-center space-x-2 text-gray-600 hover:text-forest-green transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-montserrat">Back to Admin</span>
          </Link>
          <div className="w-px h-6 bg-gray-300"></div>
          <h1 className="font-merriweather font-bold text-3xl text-charcoal">
            {id ? 'Edit Post' : 'Write New Post'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreview(true)}
            disabled={!formData.title.trim()}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-montserrat font-medium px-4 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => handleSave('draft')}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-montserrat font-medium px-4 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? (id ? 'Updating...' : 'Saving...') : (id ? 'Update Draft' : 'Save Draft')}</span>
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-forest-green hover:bg-sage-green text-white font-montserrat font-semibold px-6 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? (id ? 'Updating...' : 'Publishing...') : (id ? 'Update & Publish' : 'Publish')}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
          <p className="font-montserrat text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <label className="block font-montserrat font-semibold text-gray-700 mb-3">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title..."
              className="w-full text-2xl font-merriweather font-bold text-charcoal placeholder-gray-400 border-0 focus:outline-none resize-none"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <label className="block font-montserrat font-semibold text-gray-700 mb-3">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief excerpt that will appear in post previews..."
              rows={3}
              className="w-full font-montserrat text-gray-700 placeholder-gray-400 border-0 focus:outline-none resize-none"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <label className="block font-montserrat font-semibold text-gray-700 mb-3">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Start writing your post content here..."
              rows={20}
              className="w-full font-montserrat text-gray-700 placeholder-gray-400 border-0 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-merriweather font-bold text-lg text-charcoal mb-4">
              Post Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl font-montserrat text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-merriweather font-bold text-lg text-charcoal mb-4">
              Featured Image
            </h3>
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Featured"
                  className="w-full aspect-video object-cover rounded-xl"
                />
                <button
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl font-montserrat text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green mb-3"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-3">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-montserrat text-gray-500 text-sm mb-2">
                    Add image URL above or upload below
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block mx-auto"
                  />
                  {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
                  {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-forest-green/5 rounded-2xl p-6 border border-forest-green/20">
            <h3 className="font-merriweather font-bold text-lg text-forest-green mb-4">
              Writing Tips
            </h3>
            <ul className="space-y-2 font-montserrat text-sm text-gray-600">
              <li>• Keep your title clear and engaging</li>
              <li>• Write a compelling excerpt (150-200 words)</li>
              <li>• Use subheadings to break up content</li>
              <li>• Include personal stories and examples</li>
              <li>• End with actionable takeaways</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;