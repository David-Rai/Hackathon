import React from 'react';
import mainlogo from '../assets/mainlogo.svg'

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="mb-4 md:mb-0 font-bold text-xl" style={{ color: 'var(--secondary-orange)' }}>
          <img src={mainlogo} alt="gloculture" className='text-[100px]' />
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#features" className="hover:text-[#FFB366] transition-colors">Features</a>
          <a href="#about" className="hover:text-[#FFB366] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#FFB366] transition-colors">Explore</a>
          <a href="#contact" className="hover:text-[#FFB366] transition-colors">Map</a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Gloculture. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
