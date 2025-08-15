import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useLocation } from 'react-router'
import Nav from '../components/Nav.jsx'
import mainlogo from '../assets/mainlogo.svg'
import URL from '../../config.js'
import 'leaflet/dist/leaflet.css'
import { useNavigate, useParams } from 'react-router'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const MapCoords = () => {
    const navigate = useNavigate()
    const socket = useSocket()
    const [reports, setReports] = useState([])
    const user = useUser()
    const params = useParams()
    const { lat, lng } = params
    const location = useLocation();
    const { culture } = location.state || {}; // Fallback if undefined F


    //Getting the lat and lng
    useEffect(() => {
        console.log(culture)
    }, [])

    //Socket connection
    useEffect(() => {

        // getReports()

        if (!socket) return

        socket.on("connect", () => {
            console.log("connection established")
        })
    }, [socket])


    return (
        <main className='main flex flex-col '>

            {/* navigation bar */}
            <Nav></Nav>

            {/* LEAFLET MAP */}
            <MapContainer center={[Number(lat), Number(lng)]} zoom={7} className='w-full h-[90vh]'>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                <Marker position={[Number(lat), Number(lng)]}>
                    <Popup>
                        <div style={{ maxWidth: "200px" }}>
                            <img
                                src={culture.image_url}
                                alt={culture.title}
                                style={{ width: "100%", borderRadius: "8px", marginBottom: "5px" }}
                            />
                            <h2 style={{ fontWeight: "bold", fontSize: "16px", margin: "4px 0" }}>
                                {culture.title}
                            </h2>
                            <p style={{ fontSize: "14px", color: "#555" }}>{culture.description}</p>
                            <p style={{ fontSize: "12px", color: "#777" }}>
                                Posted by <b>{culture.username}</b> on {new Date(culture.created_at).toLocaleDateString()}
                            </p>
                            <p style={{ fontSize: "12px", marginTop: "4px" }}>
                                ❤️ {culture.like_count} | 💬 {culture.comment_count}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </main>
    )
}

export default MapCoords