import React, { useState, useEffect } from 'react';
import logo from '../assets/icon.svg';
import {
  Shield,
  MapPin,
  Users,
  Zap,
  TreePine,
  Droplets,
  AlertTriangle
} from 'lucide-react';
import Nav from '../components/Nav';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: 'Culture Exchange Map',
      description: 'Explore global traditions, festivals, and customs through an interactive world map',
      color: 'from-[#800000] to-[#a00000]'
    },
    {
      icon: Users,
      title: 'Heritage Story Vault',
      description: 'Share and discover personal cultural stories from people worldwide',
      color: 'from-[#FF8800] to-[#FFAA00]'
    },
    {
      icon: Zap,
      title: 'Live Location Tracking',
      description: 'Get suggestions for cultural spots, events, or festivals happening near you in real time',
      color: 'from-[#800000] to-[#a00000]'
    },
    {
      icon: Shield,
      title: 'AI Summarize & Chat',
      description: 'Instantly summarize cultural posts, and chat with AI for deeper insights',
      color: 'from-[#FF8800] to-[#FFAA00]'
    },
    {
      icon: TreePine,
      title: 'Special Heritage Section',
      description: 'A dedicated space for culture preservers to showcase authentic traditions, artifacts, and practices',
      color: 'from-[#800000] to-[#a00000]'
    }
  ];

  const environmentalIcons = [TreePine, Droplets, AlertTriangle];

  return (
    <>
      <Nav />

      <main className="relative bg-[#FFF1D6] overflow-hidden">
        {/* Floating environmental icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {environmentalIcons.map((Icon, index) => (
            <Icon
              key={index}
              className="absolute text-[#800000]/10 opacity-20 animate-float"
              size={60}
              style={{
                top: `${20 + index * 25}%`,
                left: `${10 + index * 30}%`,
                animationDelay: `${index * 2}s`
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative z-10 py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center transition-all duration-1000 transform-gpu"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(20px)' }}>
            <div className="inline-flex items-center justify-center h-[120px] rounded-2xl mb-8">
              <img src={logo} alt="LOculture Logo" className='h-full' />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#800000] mb-6 leading-tight">
              About Gloculture
            </h1>

            <p className="text-xl sm:text-2xl text-[#800000] max-w-3xl mx-auto mb-12 leading-relaxed">
              LOculture is a digital cultural hub designed to bring global traditions to your fingertips.
              We blend technology, storytelling, and community participation to:
            </p>

            <ul className="list-disc list-inside text-left max-w-2xl mx-auto text-[#800000] space-y-2 text-lg">
              <li>Keep traditions alive.</li>
              <li>Make cultural learning accessible and engaging.</li>
              <li>Create a global network of cultural ambassadors.</li>
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#800000] text-center mb-16">
              Key Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;

                return (
                  <div
                    key={index}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8
                 border border-white transition-all duration-500
                 hover:bg-white hover:-translate-y-2 hover:shadow-2xl ${isActive ? 'ring-2 ring-[#800000]/50 bg-white scale-105' : ''
                      }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl 
                    bg-gradient-to-br from-[#FF8800] to-[#FFA500] mb-6 shadow-lg 
                    group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-[#800000] mb-4 group-hover:text-[#FF8800] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[#800000] leading-relaxed group-hover:text-gray-900 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default About;
