
import Profile from './routes/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import { SocketProvider } from './context/SocketContext'
import PostCulture from './routes/PostCulture'
import { UserProvider } from './context/UserContext'
import { createRoot } from 'react-dom/client'
import './index.css'
import CultureDetails from './routes/CultureDetails'
import Explore from './routes/Explore'
import Home from './routes/Home'
import Feature from './routes/Feature'
import Home2 from './routes/Home2'
import Signin from './routes/Signin'
import Map from './routes/Map'
import About from './routes/About'
import MapCoords from './routes/MapCoords'
import Signup from './routes/Signup'


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
      <RouterProvider router={router}>
      </RouterProvider>
    </UserProvider>
  </SocketProvider>

)
