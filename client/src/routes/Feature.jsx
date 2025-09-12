import React from 'react';
import {
  FiMapPin,
  FiCamera,
  FiUsers,
  FiAlertTriangle,
  FiShare2,
  FiEye
} from 'react-icons/fi';
import Nav from '../components/Nav';

const Feature = () => {
  const features = [
    {
      icon: <FiMapPin />,
      title: "Culture Exchange Map",
      description: "Explore global traditions, festivals, and customs through an interactive world map."
    },
    {
      icon: <FiCamera />,
      title: "Heritage Story Vault",
      description: "Share and discover personal cultural stories from people worldwide."
    },
    {
      icon: <FiUsers />,
      title: "Live Location Tracking",
      description: "Get suggestions for cultural spots, events, or festivals happening near you in real time."
    },
    {
      icon: <FiAlertTriangle />,
      title: "AI Summarize & Chat",
      description: "Instantly summarize cultural posts, and if you still have questions, chat directly with AI for deeper insights."
    },
    {
      icon: <FiShare2 />,
      title: "Global Map",
      description: "A global map showcasig all the cultures and suggestion cultures"
    }
  ];

  return (
    <>
      <Nav />
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F9FAF8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--secondary-orange)' }}>
              How Gloculture Works
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#475569' }}>
              Gloculture turns cultural exploration into an interactive experience, connecting you with traditions, stories, and communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      className="p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow"
      style={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB' }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
        style={{ backgroundColor: 'var(--secondary-orange)' }}
      >
        {React.cloneElement(icon, { className: 'text-white text-2xl' })}
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E293B' }}>
        {title}
      </h3>
      <p style={{ color: '#475569' }}>{description}</p>
    </div>
  );
};

export default Feature;
