import React from 'react'
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch, FiMapPin, FiPlus } from "react-icons/fi";
import logo from '../assets/icon.svg'
import mainlogo from '../assets/mainlogo.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router'
import { useUser } from '../context/UserContext'

const Nav = () => {
  const navigate = useNavigate()
  const [isUser, setIsUser] = useState(false)
  const { user, setUser } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if user is logged in
  useEffect(() => {
    if (!user) return
    if (user.email) {
      setIsUser(true)
    }
  }, [user])

  // Close mobile menu when navigating
  const handleNavigate = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-content')) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img 
                  src={mainlogo} 
                  className='h-8 lg:h-10 w-auto' 
                  alt="Gloculture Logo"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            {!isUser && (
              <div className="hidden lg:flex items-center space-x-8">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/feature" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Features
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/explore" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Explore
                </NavLink>
              </div>
            )}

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isUser ? (
                // Logged in user actions
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => navigate('/postculture')}
                    className="hidden sm:flex items-center space-x-2 btn-secondary text-sm"
                  >
                    <FiPlus className="w-4 h-4" />
                    <span>Post</span>
                  </button>
                  <button 
                    onClick={() => navigate('/map')}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Map View"
                  >
                    <FiMapPin className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Profile"
                  >
                    <CgProfile className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              ) : (
                // Guest user actions
                <div className="hidden sm:flex items-center space-x-3">
                  <button 
                    className='btn2 text-sm' 
                    onClick={() => navigate('/signin')}
                  >
                    Login
                  </button>
                  <button 
                    className='btn1 text-sm' 
                    onClick={() => navigate('/signup')}
                  >
                    Signup
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6 text-gray-600" />
                ) : (
                  <HiMenuAlt3 className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div 
              className="mobile-menu-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className={`mobile-menu-content ${isMobileMenuOpen ? 'open' : 'closed'}`}>
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <img 
                    src={logo} 
                    className='h-8 w-auto' 
                    alt="Gloculture Logo"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <HiX className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2 mb-8">
                  {!isUser ? (
                    <>
                      <NavLink
                        to="/"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/')}
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/feature"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/feature')}
                      >
                        Features
                      </NavLink>
                      <NavLink
                        to="/about"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/about')}
                      >
                        About
                      </NavLink>
                      <NavLink
                        to="/explore"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/explore')}
                      >
                        Explore
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/explore"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/explore')}
                      >
                        Explore
                      </NavLink>
                      <NavLink
                        to="/map"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/map')}
                      >
                        Map
                      </NavLink>
                      <NavLink
                        to="/postculture"
                        className="mobile-nav"
                        onClick={() => handleNavigate('/postculture')}
                      >
                        Post Culture
                      </NavLink>
                      <NavLink
                        to={`/profile/${user.id}`}
                        className="mobile-nav"
                        onClick={() => handleNavigate(`/profile/${user.id}`)}
                      >
                        Profile
                      </NavLink>
                    </>
                  )}
                </div>

                {/* Mobile Auth Buttons */}
                {!isUser && (
                  <div className="space-y-3">
                    <button 
                      className='btn1 w-full' 
                      onClick={() => handleNavigate('/signin')}
                    >
                      Login
                    </button>
                    <button 
                      className='btn2 w-full' 
                      onClick={() => handleNavigate('/signup')}
                    >
                      Signup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Nav