import React from 'react';
import { Brain, Award, Layout, Leaf } from 'lucide-react';
import aboutConfig from '../../config/about.json';

const About = () => {
  const iconMap = {
    Innovation: Brain,
    Quality: Award,
    Creativity: Layout,
    Sustainability: Leaf
  };

  const values = aboutConfig.values.map(value => ({
    icon: iconMap[value.title],
    title: value.title,
    description: value.description
  }));

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-luismi text-slate-800 mb-4">
            About Penco.in
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutConfig.mission}
          </p>
        </div>
        
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold font-luismi text-slate-800 mb-6 w-full text-center">{aboutConfig.story.title}</h3>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg font-medium text-slate-700 text-center">
                <strong>Our Mission:</strong> {aboutConfig.mission}
              </p>
              <p className="text-lg font-medium text-slate-700 text-center">
                <strong>Our Vision:</strong> {aboutConfig.vision}
              </p>
              <p className="text-slate-700 pl-2">
                {aboutConfig.story.content}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute xl:-bottom-6 -bottom-2 xl:-right-6 -right-2 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold mb-1">{aboutConfig.stats[0].number}</div>
              <div className="text-sm">{aboutConfig.stats[0].label}</div>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-luismi text-slate-800 text-center mb-12">What Makes Us Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold font-luismi text-slate-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold font-luismi text-slate-800 text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutConfig.team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 mx-auto w-48 h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold font-luismi text-slate-800 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;