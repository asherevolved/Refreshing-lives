import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { posts: blogPosts, loading } = useBlogPosts('published');

  const categories = ['All', 'Mindfulness', 'Wellness', 'Sustainability', 'Nutrition', 'Lifestyle'];
  

  // Get popular posts from the most recent published posts
  const popularPosts = blogPosts.slice(0, 4).map(post => ({
    title: post.title,
    category: post.category
  }));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      {/* Header */}
      <header className="text-center mb-10 sm:mb-16">
        <h1 className="font-merriweather font-bold text-3xl sm:text-5xl md:text-6xl text-charcoal mb-4 sm:mb-6">
          Mindful Living Blog
        </h1>
        <p className="font-montserrat text-gray-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Stories, insights, and practices to support your journey toward intentional, 
          sustainable, and joyful living.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 sm:gap-16">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {/* Search and Filter */}
          <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 sm:h-6 sm:w-6" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green font-montserrat text-base sm:text-lg placeholder-gray-400"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-montserrat font-medium transition-all duration-200 text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'bg-forest-green text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200 rounded-xl mb-4 sm:mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2 sm:mb-4"></div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                  delay={index * 100} 
                />
              ))}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              {blogPosts.length === 0 ? (
                <div className="max-w-md mx-auto">
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-2xl mb-4 sm:mb-6">
                    <Filter className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <h3 className="font-merriweather font-bold text-lg sm:text-xl text-gray-600 mb-1 sm:mb-2">
                      No Posts Yet
                    </h3>
                    <p className="font-montserrat text-gray-500 text-sm sm:text-base">
                      Our mindful content is coming soon. Check back for inspiring stories and wellness insights.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="font-montserrat text-gray-500 text-base sm:text-lg">
                  No articles found matching your search criteria.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <div className="sticky top-32 space-y-6 sm:space-y-8">
            {/* Categories Widget */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-forest-green" />
                <h3 className="font-merriweather font-bold text-base sm:text-xl text-charcoal">
                  Categories
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {categories.slice(1).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="block w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-montserrat text-gray-600 hover:bg-gray-50 hover:text-forest-green transition-colors duration-200 text-sm sm:text-base"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Posts Widget */}
            {popularPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-forest-green" />
                  <h3 className="font-merriweather font-bold text-base sm:text-xl text-charcoal">
                    Recent Posts
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  {popularPosts.map((post, index) => (
                    <div key={index} className="group cursor-pointer p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <h4 className="font-montserrat font-semibold text-charcoal group-hover:text-forest-green transition-colors duration-200 mb-1 sm:mb-2 text-sm sm:text-base">
                        {post.title}
                      </h4>
                      <span className="text-xs sm:text-sm font-montserrat text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;