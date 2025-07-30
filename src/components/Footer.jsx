import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import footerConfig from '../../config/footer.json';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold font-luismi mb-2">{footerConfig.company.name}</h3>
            <p className="text-gray-300 text-sm max-w-xs">
              {footerConfig.company.tagline}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{footerConfig.contact.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{footerConfig.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{footerConfig.contact.address.city}, {footerConfig.contact.address.country}</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-right">
            {footerConfig.legal.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;