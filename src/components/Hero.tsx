import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="font-merriweather font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
          Living Mindfully,
          <br />
          <span className="text-light-sage">Growing Daily</span>
        </h1>
        <p className="font-montserrat text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
          Fostering Conscious Evolution For a Sustainable Harmonious Environment
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-forest-green hover:bg-sage-green text-white font-montserrat font-semibold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
            Begin Your Journey
          </button>
          <Link 
            to="/blog"
            className="border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm text-lg inline-block"
          >
            Explore Blogs
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/70 font-montserrat text-sm">Scroll to explore</span>
          <ArrowDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;