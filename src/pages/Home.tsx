import React from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import { Calendar, User, ArrowRight, Heart, Leaf, Users, Target, Star, Shield, Compass, Zap, BookOpen, Coffee, Sunrise } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { posts: allPosts, loading } = useBlogPosts('published');
  const featuredPosts = allPosts.slice(0, 3);
  const latestPost = allPosts[0];
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Hero />
      
      {/* Values Section */}
      <section className="bg-gradient-to-br from-forest-green to-sage-green py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img 
                src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
                alt="Refreshing Lives Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <h2 className="font-merriweather font-bold text-4xl md:text-5xl text-white mb-6">
              Our Core Values
            </h2>
            <p className="font-montserrat text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Guiding principles that shape our approach to mindful living and community building
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "Value Creation", description: "Creating meaningful value for individuals and communities" },
              { icon: Shield, title: "Integrity", description: "Adherence to moral and ethical principles in all interactions" },
              { icon: Compass, title: "Stewardship", description: "Accountability and responsibility in mentoring others" },
              { icon: Zap, title: "Transformation", description: "Bringing positive changes that leave a lasting legacy" }
            ].map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white/20 rounded-2xl">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-merriweather font-bold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="font-montserrat text-white/80 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-forest-green/10 rounded-2xl">
                  <Target className="h-8 w-8 text-forest-green" />
                </div>
                <h2 className="font-merriweather font-bold text-4xl text-charcoal">
                  Our Mission
                </h2>
              </div>
              <p className="font-montserrat text-xl text-gray-600 leading-relaxed mb-8">
                To be an organization committed to quality of service by having the best people with 
                knowledge, expertise, and capital, partnering with the best clients to deliver value.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                  <Heart className="h-8 w-8 text-forest-green mx-auto mb-3" />
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Generosity</h4>
                  <p className="font-montserrat text-gray-600 text-sm">Refreshing others through generous acts</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                  <Users className="h-8 w-8 text-forest-green mx-auto mb-3" />
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Community</h4>
                  <p className="font-montserrat text-gray-600 text-sm">Building supportive relationships</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-forest-green rounded-3xl p-6 shadow-xl">
                <img 
                  src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
                  alt="Refreshing Lives Logo" 
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Practices Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-merriweather font-bold text-4xl md:text-5xl text-charcoal mb-6">
              Daily Mindful Practices
            </h2>
            <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple yet powerful practices to integrate mindfulness into your everyday life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sunrise,
                title: "Morning Reflection",
                description: "Start each day with 10 minutes of gratitude and intention setting",
                color: "bg-yellow-50 border-yellow-200 text-yellow-700"
              },
              {
                icon: Leaf,
                title: "Mindful Breathing",
                description: "Practice conscious breathing throughout the day to center yourself",
                color: "bg-green-50 border-green-200 text-green-700"
              },
              {
                icon: Coffee,
                title: "Present Moments",
                description: "Transform routine activities into mindful experiences",
                color: "bg-blue-50 border-blue-200 text-blue-700"
              }
            ].map((practice, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className={`p-4 rounded-2xl inline-block mb-6 ${practice.color}`}>
                  <practice.icon className="h-8 w-8" />
                </div>
                <h3 className="font-merriweather font-bold text-2xl text-charcoal mb-4">
                  {practice.title}
                </h3>
                <p className="font-montserrat text-gray-600 text-lg leading-relaxed">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        {/* Latest Reflection */}
        {latestPost && (
          <section className="mb-24">
            <div className="max-w-4xl mx-auto">
              <header className="text-center mb-16">
                <h2 className="font-merriweather font-bold text-4xl md:text-5xl text-charcoal mb-6">
                  Latest Reflection
                </h2>
                <div className="w-24 h-1 bg-forest-green mx-auto rounded-full"></div>
              </header>
              
              <article className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-6 mb-8 text-gray-500 font-montserrat">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Admin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(latestPost.created_at)}</span>
                  </div>
                </div>
                
                <h3 className="font-merriweather font-bold text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
                  {latestPost.title}
                </h3>
                
                <div className="font-montserrat text-gray-600 text-lg leading-relaxed">
                  <p>{latestPost.excerpt}</p>
                </div>
                
                <div className="mt-8">
                  <button onClick={() => navigate(`/blog/${String(latestPost.id)}`)} className="flex items-center space-x-2 text-forest-green hover:text-sage-green font-montserrat font-semibold transition-colors duration-200 group">
                    <span>Continue Reading</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-24">
            <header className="text-center mb-16">
              <h2 className="font-merriweather font-bold text-4xl md:text-5xl text-charcoal mb-6">
                Featured Stories
              </h2>
              <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore mindful practices, wellness insights, and sustainable living tips 
                to support your journey toward a more intentional life.
              </p>
            </header>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 animate-pulse">
                    <div className="aspect-[16/10] bg-gray-200 rounded-xl mb-6"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredPosts.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post}
                    delay={index * 100} 
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;