import React from 'react';
import { ArrowRight, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import homeConfig from '../../config/home.json';

const Portfolio = () => {
  const featuredProducts = [
    {
      title: 'AI Smart Journal',
      image: 'https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Personalized Planner',
      image: 'https://images.pexels.com/photos/3302183/pexels-photo-3302183.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Creative Notebook',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400',
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-luismi text-slate-800 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of AI-powered stationery products. 
            Each item is beautifully designed and intelligently personalized for you.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/gallery"
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 max-w-4xl w-full"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transform -skew-y-1 group-hover:skew-y-1 transition-transform duration-500"></div>
            
            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-luismi text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                      Product Gallery
                    </h3>
                    <p className="text-gray-600">{homeConfig.stats.products_available} Products Available</p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-2 text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">Featured</span>
                </div>
              </div>

              {/* Preview Images */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="relative overflow-hidden rounded-lg aspect-video group-hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                      {product.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    Explore our complete collection of AI-powered stationery products
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <span>• AI Journals</span>
                    <span>• Smart Planners</span>
                    <span>• Custom Notebooks</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg group-hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto">
                  <span className="font-semibold">View Gallery</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-0.5 -z-10"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;