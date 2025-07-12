import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('This email is already subscribed!');
        }
        throw error;
      }

      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-forest-green to-sage-green rounded-3xl p-12 md:p-16 text-white">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <img 
              src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
              alt="Refreshing Lives Logo" 
              className="h-8 w-8 object-contain brightness-0 invert"
            />
          </div>
        </div>
        
        <h2 className="font-merriweather font-bold text-3xl md:text-4xl mb-6">
          Weekly Wellness Insights
        </h2>
        
        <p className="font-montserrat text-xl text-white/90 mb-10 leading-relaxed">
          Join our mindful community and receive thoughtful reflections, wellness tips, 
          and sustainable living practices delivered to your inbox every week.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4">
                <p className="font-montserrat text-white text-sm text-center">{error}</p>
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full border-0 bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 font-montserrat text-white placeholder-white/70 text-lg"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 text-forest-green font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center space-x-3 text-white animate-fade-in">
            <Check className="h-6 w-6" />
            <span className="font-montserrat font-medium text-lg">Welcome to our mindful community!</span>
          </div>
        )}

        <p className="font-montserrat text-white/70 mt-6">
          Weekly wellness insights. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;