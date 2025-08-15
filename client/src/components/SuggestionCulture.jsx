import { IoSend } from "react-icons/io5";
import Chats from '../components/Chats.jsx'
import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from 'react';
import { FaRegThumbsUp, FaRegCommentDots, FaShare, FaCheck } from "react-icons/fa";
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const SuggestionCulture = ({ c }) => {
    const [chats, setChats] = useState([])
    const [showChatBox, setShowChatBox] = useState(false);
    const commentRef = useRef(null);
    const chatRef = useRef(null);
    const navigate = useNavigate()
    const socket = useSocket();
    const { user, setUser } = useUser();

    //Handling the socket
    useEffect(() => {
        if (!socket) return

        //get the summerized
        socket.on("summerized", (chat_summerized) => {
            console.log(chat_summerized)
            const chat = {
                type: "summerize",
                about: chat_summerized.about
            }
            setChats(prev => [...prev, chat])
        })

        //getting more summerized answer
        socket.on("more-summerized", (answer) => {
            console.log(answer)
            const chat = {
                type: "ai",
                answer: answer
            }
            setChats(prev => [...prev, chat])
        })
    }, [])

    //handling chat
    const handleChat = (c) => {
        console.log(c)
        const question = chatRef.current.value
        const chat = {
            type: "user",
            question: question
        }
        setChats(prev => [...prev, chat])
        socket.emit("more-summerize", { c, question })

        chatRef.current.value = " "
    }


    const toggleChat = (c) => {
        console.log("comment toggle")
        setShowChatBox(!showChatBox);
        setChats([])
        summerize(c)
    };

    //summerizing the culture
    const summerize = (c) => {
        socket.emit("summerize", c)
    }

    //handlin see in map
    const handleMap = (c) => {
        const { lat, lng } = c
        console.log(c)
        navigate(`/map/${lat}/${lng}`, { state: { culture: c } })
    }


    return (
        <div className="w-full bg-gray-50 shadow-md rounded-2xl p-5 border border-gray-200 mt-5">
            {/* Header */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center justify-center gap-3">
                    <img
                        className="h-[40px] rounded-full w-[40px]"
                        src={c.user_image_url || "https://thispersondoesnotexist.com"} alt="" />
                    <p className="font-semibold text-gray-700 md:text-md text-2xl capitalize">AI Suggestion</p>
                </div>
            </div>

            {/* Content */}
            <div className="mb-3 flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="sm:w-[60%]">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {c.title}
                    </h2>

                    <div className="text-gray-700 mt-1  h-auto">
                        {c.description}
                    </div>
                </div>

                <button className="btn2 bg-(--secondary) text-white hover:bg-white hover:text-black 
        transition-all
        w-auto px-5" onClick={() => handleMap(c)}>See In Map</button>
            </div>

            {/* Image */}
            <div className="mb-3">
                <img
                    src={c.image_url}
                    alt="Report"
                    className="w-full max-h-[400px] object-cover rounded-lg"
                />
            </div>

            {/* Actions */}
            <div className="flex justify-around border-t pt-3 text-gray-600">
                <button className="flex items-center gap-2 hover:text-blue-600"
                    onClick={() => toggleChat(c)}
                >
                    <span className="flex btn1 w-auto items-center justify-center px-5">Learn with AI</span>
                </button>
            </div>

            {/* communication */}
            {showChatBox && (
                <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">

                    {
                        chats.length > 0 && chats.map((c, index) => {
                            return <Chats key={index} c={c} />
                        })
                    }

                    {/* Chat Input */}
                    <div className="flex items-center justify-center h-[60px] gap-2">
                        <input
                            ref={chatRef}
                            placeholder="Ask questions..."
                            className="w-[80%] h-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={() => handleChat(c)}
                            className="bg-blue-600 h-[60px]
                flex items-center justify-center
                text-white w-[60px] rounded-md hover:bg-blue-700"
                        >
                            <IoSend size={20} />
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SuggestionCulture