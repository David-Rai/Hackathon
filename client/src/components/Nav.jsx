import React from 'react'
import logo from '../assets/icon.svg'
import mainlogo from '../assets/mainlogo.svg'
import { TfiAlignRight, TfiClose } from "react-icons/tfi";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router'
import { useUser } from '../context/UserContext'

const Nav = () => {
  const navigate = useNavigate()
  const [isUser, setIsUser] = useState(false)
  const { user, setUser } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  //device recogination
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
      console.log("Mobile device (based on width)");
    } else {
      setIsMobile(false)
    }
  }, [])

  //skipping the login
  useEffect(() => {
    if (!user) return
    if (user.email) {
      console.log("skip login")
      setIsUser(true)
    }
    console.log("saved user", user)
  }, [user])

  // Close mobile menu when navigating
  const handleNavigate = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Navigation */}
      <div className='flex items-center justify-center py-3'>
        <nav className="w-[90%] py-4 bg-(--bg-secondary) rounded-full px-5 relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-[40px]">
            <div className='flex items-center justify-between gap-[40px]'>
              {/* Logo */}
              <div className="h-full w-auto flex items-center justify-center shrink-0 cursor-pointer"
                onClick={() => navigate("/")}
              >
                {
                  isMobile ? (
                    <img src={logo} className='w-[60px] cursor-pointer' onClick={() => navigate('/')} />
                  )
                    :
                    (
                      <img src={mainlogo} className='w-[160px] cursor-pointer' onClick={() => navigate('/')} />
                    )
                }

              </div>

              {/* Navigation Links - Desktop */}
              <ul className="hidden md:flex gap-6 text-[#5b5b5b] text-sm font-medium cursor-pointer">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/feature">Features</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink onClick={() => navigate(`/profile/${user.id}`)}>Profile</NavLink>
                </li>
                <li>
                  <NavLink onClick={() => navigate("/postculture")}>Post</NavLink>
                </li>
              </ul>
            </div>

            {/* Auth Buttons - Desktop */}
            {!isUser && (
              <div className="hidden lg:flex gap-4">
                <button className='btn1' onClick={() => navigate('/signin')}>Login</button>
                <button className='btn2' onClick={() => navigate('/signup')}>Signup</button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-4">
              {!isUser && (
                <div className="flex gap-2">
                  <button className='btn1' onClick={() => handleNavigate('/signin')}>Login</button>
                  <button className='btn2' onClick={() => handleNavigate('/signup')}>Signup</button>
                </div>
              )}
              {isMobileMenuOpen ? (
                <TfiClose
                  size={30}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cursor-pointer transition-transform duration-300 hover:rotate-90"
                />
              ) : (
                <TfiAlignRight
                  size={30}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="cursor-pointer transition-transform duration-300 hover:rotate-90"
                />
              )}
            </div>
          </div>

          {/* Mobile Menu with Transition */}
          <div className={`
          lg:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-4 z-50
          transition-all duration-300 ease-in-out transform capitalize rounded-2xl
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
        `}>
            <NavLink
              to="/"
              className="mobile-nav"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/feature"
              className="mobile-nav"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink
              to="/about"
              className="mobile-nav"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              className="mobile-nav"
              onClick={() => navigate(`/profile/${user.id}`)}>Profile</NavLink>

            <NavLink
              className="mobile-nav"
              onClick={() => navigate("/postculture")}>post</NavLink>

          </div>
        </nav>
      </div>
    </>
  )
}

export default Nav