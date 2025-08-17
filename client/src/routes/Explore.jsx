import logo from '../assets/icon.svg'
import { CgProfile } from "react-icons/cg";
import { AiOutlineGlobal } from "react-icons/ai";
import mainlogo from '../assets/mainlogo.svg'
import { useNavigate } from 'react-router'
import React from 'react'
import SuggestionCulture from '../components/SuggestionCulture.jsx'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { NavLink } from 'react-router'
import { useUser } from '../context/UserContext.jsx'
import CultureList from '../components/CultureList.jsx'

const Map = () => {
  const navigate = useNavigate()
  const socket = useSocket()
  const [cultures, setCultures] = useState([])
  const [reports, setReports] = useState([])
  const { user, setUser } = useUser()
  const [suggestions, setSuggestions] = useState([])
  const coordRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  //device recogination
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
      console.log("Mobile device (based on width)");
    } else {
      setIsMobile(false)
    }
  }, [])

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



  return (
    <main className='main flex flex-col '>

<nav className="w-full px-6 py-4 bg-[var(--bg-secondary)] shadow-md flex justify-between items-center h-[15vh] font-[var(--inter)]">
  {/* Logo */}
  <div>
    <img
      src={isMobile ? logo : mainlogo}
      className={isMobile ? 'w-[60px] cursor-pointer' : 'w-[160px] cursor-pointer'}
      alt="Logo"
      onClick={() => navigate('/')}
    />
  </div>

  {/* Search */}
  <div className='flex gap-2 md:gap-3 flex-1 max-w-xl mx-4'>
    <input
      type="text"
      placeholder='Search...'
      className='flex-1 px-4 py-2 rounded-lg border border-[var(--primary-red)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary-orange)]'
    />
    <button className='px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition'>
      Search
    </button>
  </div>

  {/* Actions */}
  <div className='flex items-center gap-4 md:gap-6'>
    <AiOutlineGlobal
      size={28}
      className='cursor-pointer text-[var(--primary-red)] hover:text-[var(--secondary)] transition'
      onClick={() => navigate('/map')}
    />
    <button
      onClick={() => navigate('/postculture')}
      className='px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition'
    >
      POST
    </button>
    <CgProfile
      size={28}
      className='cursor-pointer text-[var(--primary-red)] hover:text-[var(--secondary)] transition'
      onClick={() => navigate(`/profile/${user.id}`)}
    />
  </div>
</nav>


      {/* center */}
      <div className='flex px-5 items-center justify-center'>

        {/* left */}
        <div className='sm:w-[80%] md:w-[70%]'>
          {
            cultures.length > 0 && cultures.map((c, index) => {
              return <CultureList c={c} key={index} />
            })
          }
        </div>

      </div>

      {/* suggestions */}
      <div className='flex px-5 items-center justify-center'>
        {/* left */}
        <div className='sm:w-[80%] md:w-[70%]'>
          {
            suggestions.length > 0 && suggestions.map((s, index) => {
              return <SuggestionCulture c={s} key={index} />
            })
          }
        </div>

      </div>

    </main>
  )
}

export default Map