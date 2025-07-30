import React, { useState, useEffect } from 'react';
import { Menu, X, Home, FolderOpen, User, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isGalleryPage = location.pathname === '/gallery';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, isRoute: false },
    { id: 'gallery', label: 'Gallery', icon: FolderOpen, isRoute: true },
    { id: 'about', label: 'About', icon: User, isRoute: false },
    { id: 'contact', label: 'Contact', icon: Mail, isRoute: false }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isGalleryPage ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className={`text-2xl font-bold font-luismi transition-colors duration-300 ${
                  scrolled || isGalleryPage ? 'text-slate-800' : 'text-white'
                }`}>
                  Penco
                </h1>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  item.isRoute ? (
                    <Link
                      key={item.id}
                      to={`/${item.id}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white ${
                        scrolled || isGalleryPage ? 'text-slate-600 hover:text-white' : 'text-white hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white ${
                        scrolled || isGalleryPage ? 'text-slate-600 hover:text-white' : 'text-white hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md transition-colors duration-300 z-60 relative ${
                  scrolled || isGalleryPage ? 'text-slate-600 hover:text-slate-800' : 'text-white hover:text-gray-200'
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`absolute right-0 top-0 h-full w-80 mobile-sidebar bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-slate-800">Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            
            {/* Navigation Items */}
            <div className="flex-1 px-4 py-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return item.isRoute ? (
                    <Link
                      key={item.id}
                      to={`/${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                    >
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 w-full text-left group"
                    >
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>© 2024 Penco</p>
                <p>Building innovative solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;