import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import mainlogo from '../assets/mainlogo.svg'
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

  //Socket connection
  useEffect(() => {

    // getcultures()

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

  //Hanlding details of culture
  const handlecultureDetails = (c) => {
    navigate(`/culturedetails`, { state: { culture: c } })
  }


  return (
    <main className='main flex flex-col '>

      {/* navigation bar */}
      <nav className="w-full px-6 py-4 bg-(--bg-secondary) relative h-[15vh] flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src={mainlogo} className='w-[160px]' />
        </div>

        {/* Center */}
        <div className='flex gap-3'>
          <input type="text" placeholder='Search....'
            className='input pl-5'
          />
          <button className='btn1'>search</button>
        </div>

        {/* Extra controls  */}
        <div>
          control
        </div>
      </nav>

      {/* LEAFLET MAP */}
      <MapContainer center={[27.7172, 85.3240]} zoom={7} className='w-full h-[90vh]'>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <Marker position={[27.7172, 85.3240]}>
          <Popup >
            Welcome to Kathmandu! 🌏
          </Popup>
        </Marker>

        {cultures.map((culture) => (
          <Marker
            key={culture.id}
            position={[parseFloat(culture.lat), parseFloat(culture.lng)]}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h1 style={{ margin: '0.25em 0' }}>{culture.title}</h1>
                <p style={{ margin: '0.25em 0' }}>{culture.description}</p>
                <img src={culture.image_url} alt="" />
                <p style={{ margin: '0.25em 0', fontSize: '0.85em', color: '#555' }}>
                  🕒 {new Date(culture.created_at).toLocaleString()}
                </p>
                <button
                  onClick={() => handlecultureDetails(culture)}
                  style={{
                    marginTop: '0.5em',
                    padding: '0.4em 0.75em',
                    backgroundColor: '#2ecc71',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    width: '100%',
                  }}
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  )
}

export default Map