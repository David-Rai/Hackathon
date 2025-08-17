import logo from '../assets/icon.svg'
import mainlogo from '../assets/mainlogo.svg'
import { useNavigate } from 'react-router'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { NavLink } from 'react-router'
import { useUser } from '../context/UserContext.jsx'
import CultureList from '../components/CultureList.jsx'

const Cultures = () => {
      const navigate = useNavigate()
      const socket = useSocket()
      const [cultures, setCultures] = useState([])
      const { user, setUser } = useUser()

    return (
        <div>

        </div>
    )
}

export default Cultures