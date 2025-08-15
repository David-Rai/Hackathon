import logo from '../assets/icon.svg'
import mainlogo from '../assets/mainlogo.svg'
import { useNavigate } from 'react-router'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
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

      {/* navigation bar */}
      <nav className="w-full px-6 py-4 bg-(--bg-secondary) relative h-[15vh] flex justify-between items-center">
        {/* Logo */}
        <div>
          {
            isMobile ? (
              <img src={logo} className='w-[60px]'/>
            )
              :
              (
                <img src={mainlogo} className='w-[160px]' />
              )
          }

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
              return <CultureList c={s} key={index} />
            })
          }
        </div>

      </div>

    </main>
  )
}

export default Map