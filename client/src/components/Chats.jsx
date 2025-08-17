import React from 'react';
import { motion } from 'framer-motion';

const Chats = ({ c }) => {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 }
  };

  // Summerize message
  if (c.type === 'summerize' && c.about) {
    const { about } = c;
    return (
      <motion.div {...animationProps} className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md my-2">
        <h2 className="text-xl font-bold mb-2">About the Culture</h2>

        <div className="mb-3">
          <h3 className="font-semibold">Origin:</h3>
          <p>{about.origin}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Traditions:</h3>
          <p>{about.traditions}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Language:</h3>
          <p>{about.language}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Food:</h3>
          <p>{about.food}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Festivals:</h3>
          <p>{about.festivals}</p>
        </div>
      </motion.div>
    );
  }

  // AI answer
  if (c.type === 'ai') {
    return (
      <motion.div {...animationProps} className="flex justify-start my-2">
        <div className="text-black p-3 rounded-lg max-w-xs break-words bg-white shadow-sm">
          {c.answer.answer}
        </div>
      </motion.div>
    );
  }

  // User question
  if (c.type === 'user') {
    return (
      <motion.div {...animationProps} className="flex justify-end my-2">
        <div className="bg-gray-200 p-3 rounded-lg max-w-xs break-words">
          {c.question}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default Chats;
