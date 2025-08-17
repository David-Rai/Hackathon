import { FaHandsHelping } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Chats from '../components/Chats.jsx'
import URL from '../../config';
import { GrLike } from "react-icons/gr";
import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from 'react';
import { FaRegThumbsUp, FaRegCommentDots, FaShare, FaCheck } from "react-icons/fa";
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const CultureList = ({ c, type }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [about, setAbout] = useState([])
  const [chats, setChats] = useState([])
  const commentRef = useRef(null);
  const chatRef = useRef(null);
  const navigate = useNavigate()
  const socket = useSocket();
  const { user, setUser } = useUser();

  //Handling the socket
  useEffect(() => {
    if (!socket) return
    //on new comment
    socket.on("new-comment", ({ id }) => {
      console.log("new comment")
      getComments(id)
    })

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

  // // Get comments
  const getComments = async (id) => {
    if (showCommentBox) return;
    try {
      const res = await fetch(`${URL}/culture/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log(data)
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const toggleComment = (report_id) => {
    console.log("comment toggle")
    setShowChatBox(false)
    setShowCommentBox(!showCommentBox);

    getComments(report_id);
  };

  const toggleChat = (c) => {
    console.log("comment toggle")
    setShowCommentBox(false)
    setShowChatBox(!showChatBox);
    setChats([])
    summerize(c)
  };

  //summerizing the culture
  const summerize = (c) => {
    socket.emit("summerize", c)
  }

  const handleComment = (targetCulture) => {
    const comment = commentRef.current.value;
    const { id } = targetCulture

    console.log("new comment", targetCulture)
    console.log(user)

    if (!comment?.trim()) return;

    socket.emit("new-comment", {
      comment,
      culture_id: id,
      user_id: user.id,
      username: user.username
    });
    commentRef.current.value = "";
    getComments(id);
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
            className="h-[40px] rounded-full w-[40px] object-cover"
            src={c.user_image_url || "https://thispersondoesnotexist.com"} alt="" />
          <p className="font-semibold text-gray-700 md:text-md text-2xl capitalize">{type === "ai" ? "AI Suggestion" : c.username}</p>
        </div>
        <p className="hidden md:inline">{new Date(c.created_at).toLocaleString()}</p>
      </div>

      {/* Content */}
      <div className="mb-3 flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="sm:w-[60%]">
          <h2 className="text-xl font-semibold text-gray-800">
            {c.title
            }
          </h2>

          <div className="text-gray-700 mt-1  h-auto">
            {c.description}
          </div>
        </div>

        <button className="btn2 bg-(--primary) text-white hover:bg-white hover:text-black 
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
        >
          <GrLike />
          <h1>{c.like_count}</h1>
          <span className="hidden md:flex">Like</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-600" onClick={() => toggleComment(c.id)}>
          <FaRegCommentDots />
          <h1>{c.comment_count}</h1>
          <span className="hidden md:flex">Comment</span>

        </button>
        <button className="flex items-center gap-2 hover:text-blue-600"
          onClick={() => toggleChat(c)}
        >
          <span className="hidden md:flex">Summerize</span>
        </button>
      </div>

      {/* Comments */}
      {showCommentBox && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
          {/* Comment List */}
          <div className="space-y-3 mb-3 max-h-[200px] overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={c.id || index} className="bg-gray-100 p-3 rounded-md text-sm shadow-sm">
                  <div className="flex justify-between text-gray-500 mb-1">
                    <span>{c.username}</span>
                    <span>{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800 break-words">{c.comment || '📝 No comment text.'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Comment Input */}
          <div className="flex items-center justify-center h-[60px] gap-2">
            <input
              ref={commentRef}
              placeholder="Comment"
              className="w-[80%] h-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => handleComment(c)}
              className="bg-(--primary) h-[60px]
              flex items-center justify-center
              text-white w-[60px] rounded-md hover:bg-(--secondary) transition"
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}


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
              className="bg-(--primary) h-[60px]
                flex items-center justify-center
                text-white w-[60px] rounded-md hover:bg-(--secondary) transition"
            >
              <IoSend size={20} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CultureList