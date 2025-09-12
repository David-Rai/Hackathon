import React from 'react'
import Nav from '../components/Nav'
import { FiSearch, FiMapPin, FiPlus, FiFilter, FiGrid, FiList, FiHeart, FiShare2, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from 'react-router'
import SuggestionCulture from '../components/SuggestionCulture.jsx'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import CultureList from '../components/CultureList.jsx'

const Explore = () => {
  const navigate = useNavigate()
  const socket = useSocket()
  const [cultures, setCultures] = useState([])
  const [reports, setReports] = useState([])
  const { user, setUser } = useUser()
  const [suggestions, setSuggestions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)
  const coordRef = useRef(null)

  //Socket connection
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connection established")
      console.log(socket.id)
      suggest()
    })

    //getting the ai suggestions
    socket.on("ai-suggestions", (suggestions) => {
      console.log(suggestions.recommendations)
      setSuggestions(suggestions.recommendations)
    })

  }, [socket])

  //Suggestions on basis of locations
  useEffect(() => {
    suggest()
  }, [])

  //Sending location to backend to get suggestions
  const suggest = async () => {
    await getCoordinates()

    if (!coordRef.current) return
    if (!socket) return

    console.log("Getting the suggestion")
    console.log(coordRef.current)

    //socket emitting
    const { id } = user
    socket.emit("get-suggestions", { location: coordRef.current, id })
  }

  //Getting the coordinates of user
  const getCoordinates = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      console.log('User location:', latitude, longitude);

      coordRef.current = {
        lat: latitude,
        lng: longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  //Socket connection
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connection established")
    })

    //getting all the cultures
    socket.emit("get-random-cultures")

    socket.on("random-cultures", (data) => {
      if (data) {
        setCultures(data)
      }
    })
  }, [socket])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <main className='min-h-screen bg-[#FFFCF6]'>
      <Nav />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#800000] mb-4">
              Explore Cultures
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing cultures from around the world. Connect with communities, 
              learn about traditions, and share your own cultural experiences.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search cultures, traditions, or locations..."
                  className="input pl-12 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn1 flex items-center space-x-2">
                <FiSearch className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    showFilters 
                      ? 'bg-[#800000] text-white border-[#800000]' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-[#800000] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-[#800000] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/map')}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#800000] transition-colors"
                >
                  <FiMapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Map View</span>
                </button>
                <button
                  onClick={() => navigate('/postculture')}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Post Culture</span>
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="input w-full">
                      <option>All Categories</option>
                      <option>Traditional Arts</option>
                      <option>Festivals</option>
                      <option>Food & Cuisine</option>
                      <option>Music & Dance</option>
                      <option>Language</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Region
                    </label>
                    <select className="input w-full">
                      <option>All Regions</option>
                      <option>Asia</option>
                      <option>Europe</option>
                      <option>Africa</option>
                      <option>Americas</option>
                      <option>Oceania</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select className="input w-full">
                      <option>Most Recent</option>
                      <option>Most Popular</option>
                      <option>Most Liked</option>
                      <option>Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#800000]">
                Recommended for You
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FiHeart className="w-4 h-4" />
                <span>Based on your location</span>
              </div>
            </div>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {suggestions.map((s, index) => (
                <SuggestionCulture c={s} key={index} viewMode={viewMode} />
              ))}
            </div>
          </div>
        )}

        {/* All Cultures */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">
              All Cultures
            </h2>
            <div className="text-sm text-gray-500">
              {cultures.length} cultures found
            </div>
          </div>
          
          {cultures.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {cultures.map((c, index) => (
                <CultureList c={c} key={index} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FiSearch className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No cultures found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find more cultures.
              </p>
              <button
                onClick={() => navigate('/postculture')}
                className="btn1"
              >
                Be the first to post a culture
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Explore