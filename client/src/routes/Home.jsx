import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { useUser } from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketContext';

const Home = () => {
  const socket = useSocket()
  const navigate = useNavigate()
  const { user, setUser } = useUser()

    useEffect(() => {
      if (!user) return;
      if (user.email) navigate('/explore');
    }, [user]);
  
    
  //Socket connection
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connection established")
      console.log(socket.id)
    })

  }, [socket])

  return (

    <>
      <main className="bg-[#F9FAF8] min-h-screen">
        {/* NAV */}
        <Nav />

        {/* //Hero section */}
        <section className="w-full px-6 py-24 flex flex-col items-center gap-4">
          {/* // Left */}
          <div className="flex flex-col sm:flex-row justify-center items-center text-(--primary)">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Global Cultures,
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-(--secondary)">
              One Platform
            </h1>
          </div>

          <p className="text-[#1E293B] text-base sm:text-lg md:w-[80%]">
            “Explore the richness of cultures from every corner of the world, all in one place. From traditions and art to languages and festivals, immerse yourself in the diversity that makes each culture
            unique. Discover, learn, and connect with a global community celebrating heritage and creativity.”
          </p>

          {/* Buttons  */}
          <div className="flex gap-4 justify-center lg:justify-start ">
            <button className='btn1 w-[120px] h-[40px] rounded-3xl' onClick={() => navigate("/explore")}>Explore</button>
          </div>
        </section>


      </main>
      <Footer />
      <ToastContainer autoClose={100} />
    </>
  );
};



export default Home;
