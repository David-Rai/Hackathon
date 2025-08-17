import React from 'react'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <aside className="h-screen w-[200px] bg-red-200 fixed top-0 left-0 flex flex-col p-4 shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
      >
        Home
      </button>
    </aside>
  )
}

export default Sidebar
