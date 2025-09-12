import Nav from '../components/Nav'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiSearch, FiFilter, FiList, FiMapPin, FiEye, FiHeart, FiShare2, FiArrowLeft } from 'react-icons/fi'
import URL from '../../config.js'
import 'leaflet/dist/leaflet.css'
import { useNavigate, useParams } from 'react-router'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const Map = () => {
  const navigate = useNavigate()
  const user = useUser()
  const socket = useSocket()
  const [cultures, setCultures] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showList, setShowList] = useState(false)
  const [selectedCulture, setSelectedCulture] = useState(null)
  const [mapCenter, setMapCenter] = useState([27.7172, 85.3240])
  const [mapZoom, setMapZoom] = useState(7)

  //Socket connection
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connection established")
    })

    socket.emit("get-random-cultures")
    socket.on("random-cultures", (data) => {
      console.log(data)
      setCultures(data)
    })
  }, [socket])

  //Handling details of culture
  const handleCultureDetails = (c) => {
    navigate(`/culturedetails`, { state: { culture: c } })
  }

  const handleMarkerClick = (culture) => {
    setSelectedCulture(culture)
    setMapCenter([parseFloat(culture.lat), parseFloat(culture.lng)])
    setMapZoom(12)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  const filteredCultures = cultures.filter(culture => 
    culture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    culture.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className='min-h-screen bg-[#FFFCF6]'>
      <Nav />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/explore')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#800000] transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Back to Explore</span>
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#800000]">
                  Cultural Map
                </h1>
                <p className="text-gray-600">
                  Discover cultures around the world
                </p>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search cultures..."
                    className="input pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn1">
                  <FiSearch className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowList(!showList)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    showList 
                      ? 'bg-[#800000] text-white border-[#800000]' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                  <span className="hidden sm:inline">List View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-200px)]">
        {/* Map Container */}
        <div className={`${showList ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            className='w-full h-full'
            key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />

            {/* Default marker for Kathmandu */}
            <Marker position={[27.7172, 85.3240]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-[#800000] mb-2">Welcome to Kathmandu! 🌏</h3>
                  <p className="text-sm text-gray-600">
                    The cultural heart of Nepal, rich in traditions and heritage.
                  </p>
                </div>
              </Popup>
            </Marker>

            {/* Culture markers */}
            {filteredCultures.map((culture) => (
              <Marker
                key={culture.id}
                position={[parseFloat(culture.lat), parseFloat(culture.lng)]}
                eventHandlers={{
                  click: () => handleMarkerClick(culture)
                }}
              >
                <Popup>
                  <div className="p-3 min-w-[250px]">
                    <div className="mb-3">
                      <img 
                        src={culture.image_url} 
                        alt={culture.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-[#800000] mb-2 text-lg">
                        {culture.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {culture.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>🕒 {new Date(culture.created_at).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <FiHeart className="w-3 h-3" />
                            <span>24</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiShare2 className="w-3 h-3" />
                            <span>8</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCultureDetails(culture)}
                      className="w-full btn1 text-sm py-2"
                    >
                      <FiEye className="w-4 h-4 inline mr-2" />
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar List */}
        {showList && (
          <div className="w-1/3 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-[#800000] mb-2">
                Cultures ({filteredCultures.length})
              </h3>
              <p className="text-sm text-gray-600">
                Click on a culture to view it on the map
              </p>
            </div>
            
            <div className="p-4 space-y-4">
              {filteredCultures.length > 0 ? (
                filteredCultures.map((culture) => (
                  <div 
                    key={culture.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedCulture?.id === culture.id 
                        ? 'border-[#800000] bg-[#FFF1D6]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleMarkerClick(culture)}
                  >
                    <div className="flex space-x-3">
                      <img 
                        src={culture.image_url} 
                        alt={culture.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#800000] mb-1 line-clamp-1">
                          {culture.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {culture.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(culture.created_at).toLocaleDateString()}</span>
                          <div className="flex items-center space-x-2">
                            <span className="flex items-center space-x-1">
                              <FiHeart className="w-3 h-3" />
                              <span>24</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FiMapPin className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-600 mb-2">No cultures found</h4>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or explore more areas on the map.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Map