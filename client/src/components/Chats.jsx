import React from 'react';

const Chats = ({ c }) => {
  // If c.type is summerize, extract about
  if (c.type === 'summerize' && c.about) {
    const { about } = c;
    return (
      <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md my-2">
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
      </div>
    );
  }

  // If c.type is ai, render answer on the right
  if (c.type === 'ai') {

    console.log(c.answer)
    return (
      <div className="flex justify-end my-2">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs break-words">
          {/* {typeof c.answer === 'object' ? JSON.stringify(c.answer) : c.answer} */}
          {c.answer.answer}
        </div>
      </div>
    );
  }


  // If c.type is user, render question on the left
  if (c.type === 'user') {
    return (
      <div className="flex justify-start my-2">
        <div className="bg-gray-200 p-3 rounded-lg max-w-xs break-words">
          {c.question}
        </div>
      </div>
    );
  }

  // fallback for unknown type
  return null;
};

export default Chats;
