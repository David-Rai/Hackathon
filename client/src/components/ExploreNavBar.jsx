
import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  User,
  Menu,
  X
} from 'lucide-react';

const ExploreNavbar = ({ user, logo, mainlogo, isMobile, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="w-full px-4 sm:px-6 py-4 bg-[var(--bg-secondary)] relative h-[15vh] flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="flex-shrink-0">
        {isMobile ? (
          <img 
            src={logo} 
            alt="Logo"
            className='w-[50px] sm:w-[60px] cursor-pointer transition-transform hover:scale-105' 
            onClick={() => navigate('/')} 
          />
        ) : (
          <img 
            src={mainlogo} 
            alt="Main Logo"
            className='w-[120px] sm:w-[160px] cursor-pointer transition-transform hover:scale-105' 
            onClick={() => navigate('/')} 
          />
        )}
      </div>

      {/* Desktop Search Bar */}
      <div className='hidden md:flex items-center gap-3'>
        <input 
          type="text" 
          placeholder='Search....'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='input pl-5 w-64'
        />
        <button 
          onClick={handleSearch}
          className='btn1'
        >
          search
        </button>
      </div>

      {/* Desktop Controls */}
      <div className='hidden md:flex items-center justify-center gap-5'>
        <Globe 
          size={30} 
          className='cursor-pointer text-gray-600 hover:text-[var(--primary)] transition-colors'
          onClick={() => navigate('/map')}
        />
        
        <button
          onClick={() => navigate('/postculture')}
          className='btn1 bg-transparent text-[var(--primary)] border-[1px] border-[var(--primary)]'
        >
          POST
        </button>
        
        <User 
          size={30} 
          className='cursor-pointer text-gray-600 hover:text-[var(--primary)] transition-colors'
          onClick={() => navigate(`/profile/${user?.id}`)}
        />
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <Menu size={24} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-secondary)] border-t border-gray-200 shadow-lg z-50">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder='Search....'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='input pl-5 flex-1'
              />
              <button 
                onClick={handleSearch}
                className='btn1'
              >
                search
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate('/map');
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <Globe size={24} className='text-gray-600' />
                <span className="font-medium text-gray-700">Explore Map</span>
              </button>

              <button
                onClick={() => {
                  navigate('/postculture');
                  setIsMenuOpen(false);
                }}
                className="btn1 bg-transparent text-[var(--primary)] border-[1px] border-[var(--primary)] w-full"
              >
                POST
              </button>

              <button
                onClick={() => {
                  navigate(`/profile/${user?.id}`);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <User size={24} className='text-gray-600' />
                <span className="font-medium text-gray-700">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ExploreNavbar;