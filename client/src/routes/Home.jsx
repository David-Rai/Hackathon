import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { useUser } from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketContext';
import { FiGlobe, FiUsers, FiHeart, FiMapPin, FiArrowRight, FiStar } from 'react-icons/fi';

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

  const features = [
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Discovery",
      description: "Explore cultures from every corner of the world in one unified platform."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Driven",
      description: "Connect with people who share your passion for cultural diversity."
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Authentic Stories",
      description: "Discover real stories, traditions, and experiences from local communities."
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Interactive Maps",
      description: "Visualize cultural locations and explore the world through our interactive map."
    }
  ];

  const stats = [
    { number: "10K+", label: "Cultural Stories" },
    { number: "150+", label: "Countries" },
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Connections Made" }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFFCF6] via-white to-[#FFF1D6]">
        <Nav />

        {/* Hero Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center max-w-5xl mx-auto">
              {/* Main Heading */}
              <div className="mb-8">
                <h1 className="text-responsive-xl font-bold leading-tight mb-6">
                  <span className="text-[#800000]">Global Cultures,</span>
                  <br />
                  <span className="text-gradient">One Platform & Android</span>
	  
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Explore the richness of cultures from every corner of the world, all in one place. 
                  From traditions and art to languages and festivals, immerse yourself in the diversity 
                  that makes each culture unique.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button 
                  className='btn1 text-lg px-8 py-4 flex items-center space-x-2' 
                  onClick={() => navigate("/explore")}
                >
                  <span>Start Exploring</span>
                  <FiArrowRight className="w-5 h-5" />
                </button>
                <button 
                  className='btn2 text-lg px-8 py-4 flex items-center justify-center' 
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-[#800000] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#800000] mb-4">
                Why Choose Gloculture?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover what makes our platform the ultimate destination for cultural exploration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-[#FF8800] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#800000] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-[#FFF1D6]">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#800000] mb-4">
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of users who are already exploring the world's cultures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  location: "New York, USA",
                  text: "Gloculture has opened my eyes to so many beautiful traditions I never knew existed. The community is amazing!"
                },
                {
                  name: "Ahmed Hassan",
                  location: "Cairo, Egypt",
                  text: "As someone passionate about preserving cultural heritage, this platform is exactly what the world needs."
                },
                {
                  name: "Maria Santos",
                  location: "Barcelona, Spain",
                  text: "The interactive maps and authentic stories make learning about different cultures so engaging and fun."
                }
              ].map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-[#FF8800] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-[#800000]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#800000] mb-6">
                Ready to Explore the World?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our global community and start your cultural journey today. 
                Discover, learn, and connect with people from around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className='btn1 text-lg px-8 py-4 flex items-center justify-center space-x-2' 
                  onClick={() => navigate("/signup")}
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="w-5 h-5" />
                </button>
                <button 
                  className='btn2 text-lg px-8 py-4' 
                  onClick={() => navigate("/explore")}
                >
                  Browse Cultures
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ToastContainer autoClose={100} />
    </>
  );
};

export default Home;
