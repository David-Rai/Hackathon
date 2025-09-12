import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav'
import { useUser } from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketContext';

const Home = () => {
    const socket = useSocket()
    const navigate = useNavigate()
    const { user, setUser } = useUser()

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
                <div className='h-screen w-full flex px-7'>
                    {/* left */}
                    <div className='w-[40%] h-full flex flex-col gap-5 items-start' >
                        <div className='text-7xl'>
                            <h1>Global Cultures</h1>
                            <h1>One Platform</h1>
                        </div>
                        <p>“Explore the richness of cultures from every corner of
                            the world, all in one place. From traditions and art
                            to languages and festivals, immerse yourself in the
                            diversity that makes each culture unique. Discover,
                            learn, and connect with a global community celebrating
                            heritage and creativity.”</p>
                        <button className='btn1'>Explore</button>
                    </div>

                    {/* right */}
                    <div>

                    </div>
                </div>

            </main>
            <ToastContainer autoClose={100} />
        </>
    );
};



export default Home;
