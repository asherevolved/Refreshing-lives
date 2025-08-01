import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Mail, Edit3, LogOut, User, Facebook } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
                alt="Refreshing Lives Logo" 
                className="h-12 w-auto object-contain"
              />
              <span className="font-merriweather font-bold text-2xl text-charcoal">
                Refreshing Lives
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-montserrat font-medium text-lg transition-colors duration-200 relative ${
                    isActive(item.href)
                      ? 'text-forest-green'
                      : 'text-gray-600 hover:text-forest-green'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-forest-green rounded-full"></div>
                  )}
                </Link>
              ))}
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/admin"
                    className="p-2 text-gray-600 hover:text-forest-green hover:bg-gray-100 rounded-lg transition-all duration-200"
                    title="Admin"
                  >
                    <Edit3 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-2 bg-forest-green hover:bg-sage-green text-white font-montserrat font-medium px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-forest-green hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 animate-slide-up">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-montserrat font-medium py-3 px-4 rounded-xl transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-forest-green bg-forest-green/10'
                        : 'text-gray-600 hover:text-forest-green hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 font-montserrat font-medium py-3 px-4 rounded-xl text-gray-600 hover:text-forest-green hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Edit3 className="h-5 w-5" />
                      <span>Admin</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 font-montserrat font-medium py-3 px-4 rounded-xl text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 font-montserrat font-medium py-3 px-4 rounded-xl bg-forest-green text-white hover:bg-sage-green transition-colors duration-200 w-full text-left"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-charcoal text-white mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
                  alt="Refreshing Lives Logo" 
                  className="h-8 w-auto object-contain"
                />
                <span className="font-merriweather font-bold text-xl">Refreshing Lives</span>
              </div>
              <p className="font-montserrat text-gray-300 leading-relaxed">
                Embracing mindful living and wellness practices to create a more intentional, 
                sustainable, and fulfilling life journey.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-merriweather font-bold text-lg mb-6">Get in Touch</h3>
              <div className="space-y-3 text-gray-300 font-montserrat">
                <p>refreshinglives.org@gmail.com</p>
                <p>Based in Ballari, Karnataka, India</p>
              </div>
            </div>

            {/* Social & Navigation */}
            <div>
              <h3 className="font-merriweather font-bold text-lg mb-6">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://www.instagram.com/suneelantony/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-forest-green transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/antonysuneel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-forest-green transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/refreshinglivesministries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-forest-green transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@refreshinglives-j4z?si=RFC9YvhYO8WBWzj9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-forest-green transition-colors duration-200"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="mailto:refreshinglives.org@gmail.com"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-forest-green transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="font-montserrat text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="font-montserrat text-gray-400">
              © 2025 Refreshing Lives. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;