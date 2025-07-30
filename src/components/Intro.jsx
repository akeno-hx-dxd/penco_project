import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from './VideoModal';
import homeConfig from '../../config/home.json';

const Intro = () => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section id="intro" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -skew-y-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold font-luismi text-white leading-tight">
            {homeConfig.hero.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-luismi">
              {homeConfig.company.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {homeConfig.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <button
              onClick={scrollToPortfolio}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>{homeConfig.hero.cta_primary}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={openVideo}
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
            >
              <Play className="w-5 h-5" />
              <span>{homeConfig.hero.cta_secondary}</span>
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: homeConfig.stats.products_available, label: 'Products Available' },
            { number: homeConfig.stats.happy_customers, label: 'Happy Customers' },
            { number: homeConfig.stats.ai_designs_generated, label: 'AI Designs Generated' },
            { number: homeConfig.stats.satisfaction_rate, label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-luismi text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={closeVideo}
        videoUrl={homeConfig.hero.video_demo_url}
        title={`${homeConfig.company.name} Demo`}
      />
    </>
  );
};

export default Intro;