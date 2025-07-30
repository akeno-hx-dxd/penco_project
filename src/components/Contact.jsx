import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import contactConfig from '../../config/contact.json';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    //parse the form 
    //and send to smtp server
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: contactConfig.contact.email.primary,
      action: `mailto:${contactConfig.contact.email.primary}`
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: contactConfig.contact.phone.primary,
      action: `tel:${contactConfig.contact.phone.primary.replace(/\s+/g, '')}`
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: `${contactConfig.contact.address.office.street}, ${contactConfig.contact.address.office.city}`,
      action: 'https://maps.google.com'
    }
  ];

  const businessHours = [
    { day: 'Weekdays', hours: contactConfig.contact.hours.weekdays },
    { day: 'Saturday', hours: contactConfig.contact.hours.weekends },
    { day: 'Sunday', hours: contactConfig.contact.hours.closed }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-luismi text-white mb-4">
            {contactConfig.hero.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {contactConfig.hero.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold font-luismi text-slate-800 mb-6">{contactConfig.form.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {contactConfig.form.fields[0].label} {contactConfig.form.fields[0].required && '*'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={contactConfig.form.fields[0].required}
                    className="w-full min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={contactConfig.form.fields[0].placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {contactConfig.form.fields[1].label} {contactConfig.form.fields[1].required && '*'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={contactConfig.form.fields[1].required}
                    className="w-full min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={contactConfig.form.fields[1].placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {contactConfig.form.fields[2].label} {contactConfig.form.fields[2].required && '*'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={contactConfig.form.fields[2].required}
                    className="w-full min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={contactConfig.form.fields[2].placeholder}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {contactConfig.form.fields[3].label} {contactConfig.form.fields[3].required && '*'}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required={contactConfig.form.fields[3].required}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  {contactConfig.form.fields[3].options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {contactConfig.form.fields[4].label} {contactConfig.form.fields[4].required && '*'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required={contactConfig.form.fields[4].required}
                  rows={5}
                  className="w-full min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder={contactConfig.form.fields[4].placeholder}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{contactConfig.form.submitText}</span>
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-blue-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold font-luismi mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-700 p-3 rounded-lg">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <a
                          href={item.action}
                          className="text-blue-200 hover:text-white transition-colors duration-300"
                        >
                          {item.details}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-gray-800 rounded-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold font-luismi">Business Hours</h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between flex-col">
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-white font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Global Presence */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-6 h-6" />
                <h3 className="text-xl font-bold font-luismi">Global Presence</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Serving clients worldwide with offices in major tech hubs and remote teams 
                across multiple time zones.
              </p>
              <div className="text-sm text-blue-200">
                Available for international projects and partnerships
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;