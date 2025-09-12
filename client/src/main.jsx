import { useState, useEffect } from 'react'
import logo from '../public/icon.svg'

import Profile from './routes/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import { SocketProvider } from './context/SocketContext.jsx'
import PostCulture from './routes/PostCulture.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import CultureDetails from './routes/CultureDetails.jsx'
import Explore from './routes/Explore.jsx'
import Home from './routes/Home.jsx'
import Feature from './routes/Feature.jsx'
// import Home2 from './routes/Home2.jsx'
import Map from './routes/Map.jsx'
import About from './routes/About.jsx'
import MapCoords from './routes/MapCoords.jsx'
import Signup from './routes/Signup.jsx'
import Signin from './routes/Signin.jsx'


// Loader Component
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img
        src={logo}
        alt="Gloculture Logo"
        className="w-30 h-30 animate-ping"
      />
    </div>
  )
}

function Load() {
  console.log("loading....")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // show loader for 2s
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />; // ✅ loader before routes

  return <RouterProvider router={router} />;
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/postculture",
    element: <PostCulture />
  },
  {
    path: "/explore",
    element: <Explore />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/feature",
    element: <Feature />
  },
  {
    path: "/map",
    element: <Map />
  },
  {
    path: "/map/:lat/:lng",
    element: <MapCoords />
  },
  {
    path: "/profile/:user_id",
    element: <Profile />
  }, {
    path: "/culturedetails",
    element: <CultureDetails />
  }
])


createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <UserProvider>
      <Load />
    </UserProvider>
  </SocketProvider>

)
