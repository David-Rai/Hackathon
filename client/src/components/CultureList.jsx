import { FaHandsHelping } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Chats from '../components/Chats.jsx'
import URL from '../../config';
import { GrLike } from "react-icons/gr";
import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from 'react';
import { FaRegThumbsUp, FaRegCommentDots, FaShare, FaCheck } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiEye, FiX, FiZap } from "react-icons/fi";
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const CultureList = ({ c, type, viewMode = 'grid' }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [about, setAbout] = useState([])
  const [chats, setChats] = useState([])
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const commentRef = useRef(null);
  const chatRef = useRef(null);
  const navigate = useNavigate()
  const socket = useSocket();
  const { user, setUser } = useUser();

  // Check if description is long enough to need truncation
  useEffect(() => {
    if (c.description && c.description.length > 150) {
      setIsDescriptionLong(true);
    }
  }, [c.description]);

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
    setIsFullScreen(!showCommentBox); // Open full screen when opening comments

    getComments(report_id);
  };

  const toggleChat = (c) => {
    console.log("chat toggle")
    setShowCommentBox(false)
    setShowChatBox(!showChatBox);
    setIsFullScreen(!showChatBox); // Open full screen when opening chat
    setChats([])
    summerize(c)
  };

  const closeFullScreen = () => {
    setShowCommentBox(false);
    setShowChatBox(false);
    setIsFullScreen(false);
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


  // Get truncated description
  const getDisplayDescription = () => {
    if (!c.description) return '';
    if (!isDescriptionLong || showFullDescription) {
      return c.description;
    }
    return c.description.substring(0, 150) + '...';
  };

  return (
    <div className={`w-full bg-white shadow-md rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-lg ${
      viewMode === 'list' ? 'p-6' : 'p-5'
    } ${viewMode === 'grid' ? 'mt-5' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
            src={c.user_image_url || "https://thispersondoesnotexist.com"} 
            alt={c.username || "User"} 
          />
          <div>
            <p className="font-semibold text-gray-800 capitalize">
              {type === "ai" ? "AI Suggestion" : c.username}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(c.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button 
          className="btn-secondary flex items-center justify-center space-x-2 text-sm px-4 py-2"
          onClick={() => handleMap(c)}
        >
          <FiEye className="w-4 h-4" />
          <span className="hidden sm:inline">View on Map</span>
        </button>
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-[#800000] mb-3 leading-tight">
        {c.title}
          </h2>

      {/* Description */}
      <div className="mb-4">
        <div className={`text-gray-700 leading-relaxed text-base transition-all duration-300 ${
          !showFullDescription && isDescriptionLong ? 'h-[80px] overflow-hidden' : 'min-h-[80px]'
        }`}>
          {getDisplayDescription()}
        </div>
        {isDescriptionLong && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="flex items-center space-x-1 text-[#800000] hover:text-[#660000] font-medium mt-2 transition-colors"
          >
            <span>{showFullDescription ? 'Show less' : 'See more'}</span>
            {showFullDescription ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Image */}
      <div className="mb-4">
                 <img
           src={c.image_url}
           alt={c.title || "Culture Image"}
           className="w-full h-[300px] object-cover rounded-lg shadow-sm"
         />
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#800000] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
            <GrLike className="w-5 h-5" />
            <span className="font-medium text-sm">{c.like_count || 0}</span>
            <span className="hidden sm:inline text-sm">Like</span>
          </button>

          {/* Comment Button */}
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-[#800000] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50" 
            onClick={() => toggleComment(c.id)}
          >
            <FaRegCommentDots className="w-5 h-5" />
            <span className="font-medium text-sm">{c.comment_count || 0}</span>
            <span className="hidden sm:inline text-sm">Comment</span>
        </button>

          {/* Summarize Button */}
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-[#800000] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
          onClick={() => toggleChat(c)}
        >
            <FiZap className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Summarize</span>
          </button>
        </div>
      </div>

      {/* Comments - Full Screen Modal */}
      {showCommentBox && (
        <div className={`fixed inset-0 z-50 bg-white ${isFullScreen ? 'block' : 'hidden'}`}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
            <button
              onClick={closeFullScreen}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-600" />
        </button>
      </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={comment.id || index} className="flex space-x-3">
                  <img
                    src={comment.user_image_url || "https://thispersondoesnotexist.com"}
                    alt={comment.username}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-800 text-sm">{comment.username}</span>
                        <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 text-sm break-words">{comment.comment || '📝 No comment text.'}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaRegCommentDots className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No comments yet</h3>
                <p className="text-gray-500">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>

          {/* Comment Input - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.image_url || "https://thispersondoesnotexist.com"}
                alt="Your profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 flex items-center space-x-2">
            <input
              ref={commentRef}
                  placeholder="Write a comment..."
                  className="flex-1 h-10 border border-gray-300 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
            />
            <button
              onClick={() => handleComment(c)}
                  className="btn1 h-10 w-10 rounded-full flex items-center justify-center"
            >
                  <IoSend size={16} />
            </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* AI Chat - Full Screen Modal */}
      {showChatBox && (
        <div className={`fixed inset-0 z-50 bg-white ${isFullScreen ? 'block' : 'hidden'}`}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FF8800] rounded-full flex items-center justify-center">
                <FiZap className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
            </div>
            <button
              onClick={closeFullScreen}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div key={index} className="flex space-x-3">
                  {chat.type === 'user' ? (
                    <>
                      <img
                        src={user?.image_url || "https://thispersondoesnotexist.com"}
                        alt="You"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="bg-[#800000] text-white rounded-2xl px-4 py-2 ml-auto max-w-[80%]">
                          <p className="text-sm break-words">{chat.question}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-[#FF8800] rounded-full flex items-center justify-center flex-shrink-0">
                        <FiZap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-700 break-words">
                            {typeof (chat.about || chat.answer) === 'object' 
                              ? JSON.stringify(chat.about || chat.answer, null, 2)
                              : (chat.about || chat.answer)
                            }
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#FF8800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">AI Assistant</h3>
                <p className="text-gray-500">Ask me anything about this culture!</p>
              </div>
            )}
          </div>

          {/* Chat Input - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.image_url || "https://thispersondoesnotexist.com"}
                alt="Your profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 flex items-center space-x-2">
            <input
              ref={chatRef}
                  placeholder="Ask questions about this culture..."
                  className="flex-1 h-10 border border-gray-300 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
            />
            <button
              onClick={() => handleChat(c)}
                  className="btn-secondary h-10 w-10 rounded-full flex items-center justify-center"
            >
                  <IoSend size={16} />
            </button>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultureList