import React from 'react';
import { Users, Target, Award, Globe } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that drive progress.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Our success is built on strong partnerships and transparent communication with clients.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Our solutions reach across industries and continents, making a positive difference worldwide.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Visionary leader with 15+ years in tech innovation.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in scalable architecture and emerging technologies.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning designer focused on user-centered experiences.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About Penco
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 2019, Penco has been at the forefront of digital transformation, 
            helping businesses navigate the complexities of modern technology.
          </p>
        </div>
        
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Penco was born from a simple belief: technology should empower businesses, 
                not complicate them. Our founders, seasoned professionals from Fortune 500 
                companies, recognized the gap between cutting-edge technology and practical 
                business solutions.
              </p>
              <p>
                Today, we're a team of passionate innovators, designers, and strategists 
                dedicated to creating solutions that make a real difference. We've helped 
                over 50 companies across various industries transform their operations and 
                achieve unprecedented growth.
              </p>
              <p>
                Our approach combines deep technical expertise with genuine business insight, 
                ensuring that every solution we deliver drives measurable results for our clients.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold mb-1">5+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Values</h3>
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
                  <h4 className="text-xl font-semibold text-slate-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 mx-auto w-48 h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
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