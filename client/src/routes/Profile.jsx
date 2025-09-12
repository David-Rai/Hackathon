import React, { useEffect, useState } from 'react';
import banner from '../assets/banner.jpg'
import CultureList from '../components/CultureList.jsx'
import Nav from '../components/Nav.jsx';
import { useParams, Outlet, NavLink } from 'react-router';
import axios from 'axios';
import ProfileImageUpload from '../components/ProfileImageUpload.jsx'
import URL from '../../config.js';
import { useSocket } from '../context/SocketContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { FiEdit3, FiMapPin, FiCalendar, FiMail, FiUser, FiHeart, FiShare2, FiSettings, FiPlus, FiGrid, FiList } from 'react-icons/fi';

const Profile = () => {
    const { user, setUser } = useUser()
    const { user_id } = useParams();
    const socket = useSocket()
    const [ProfileImage, setProfileImage] = useState(null)
    const [remoteData, setRemoteData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [cultures, setCultures] = useState([])
    const [isOriginalUser, setIsOriginalUser] = useState(false)
    const [activeTab, setActiveTab] = useState('cultures')
    const [viewMode, setViewMode] = useState('grid')

    //socket connection handling
    useEffect(() => {
        if (!socket) return

        //getting all cultures
        socket.emit("get-cultures", { id: user.id })

        socket.on("all-cultures", (data) => {
            console.log("cultures", data)
            if (data) {
                setCultures(data)
            }
        })
    }, [socket])

    useEffect(() => {
        console.log("saved user", user)
    }, [user])

    useEffect(() => {
        console.log(user_id)
        const fetchremoteData = async () => {
            try {
                const res = await axios.get(`${URL}/profile/${user_id}`);
                console.log(res.data)
                setRemoteData(res.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchremoteData();
    }, [user_id]);

    //Getting my original data
    useEffect(() => {
        if (!user || !remoteData) return

        const remoteUser = remoteData?.result[0].email
        const originalUser = user?.email

        console.log(remoteData)
        console.log(originalUser)
        if (remoteUser === originalUser) {
            setIsOriginalUser(true)
            console.log("you are the owner")
        } else {
            setIsOriginalUser(false)
            console.log("You are not the owner")
        }
    }, [user, remoteData])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FFFCF6] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800000] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading profile...</p>
                </div>
            </main>
        );
    }

    const tabs = [
        { id: 'cultures', label: 'Cultures', count: cultures.length },
        { id: 'about', label: 'About', count: null },
        { id: 'activity', label: 'Activity', count: null }
    ];

    return (
        <main className="min-h-screen bg-[#FFFCF6]">
            <Nav />

            {/* Profile Header */}
            <section className="bg-white border-b border-gray-200">
                <div className="container py-8">
                    {/* Banner */}
                    <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
                        <img
                            src={banner}
                            alt="Profile Banner"
                            className="w-full h-full object-cover"
                        />
                        {isOriginalUser && (
                            <button className="absolute bottom-4 right-4 btn-secondary flex items-center space-x-2">
                                <FiEdit3 className="w-4 h-4" />
                                <span>Edit Banner</span>
                            </button>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={remoteData.result[0].image_url || "https://thispersondoesnotexist.com"}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isOriginalUser && (
                                    <div className="absolute -bottom-2 -right-2">
                                        <ProfileImageUpload ProfileImage={ProfileImage} setProfileImage={setProfileImage} />
                                    </div>
                                )}
                            </div>

                            {/* User Details */}
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#800000] mb-2">
                                    {remoteData.result[0].name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <FiMail className="w-4 h-4" />
                                        <span>{remoteData?.result?.[0]?.email || 'Email not provided'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiCalendar className="w-4 h-4" />
                                        <span>Joined {new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 max-w-2xl">
                                    Passionate about sharing and discovering cultures from around the world. 
                                    Join me on this journey of cultural exploration and connection.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            {isOriginalUser ? (
                                <>
                                    <button className="btn-secondary flex items-center space-x-2">
                                        <FiPlus className="w-4 h-4" />
                                        <span>Post Culture</span>
                                    </button>
                                    <button className="btn2 flex items-center space-x-2">
                                        <FiSettings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn1 flex items-center space-x-2">
                                        <FiHeart className="w-4 h-4" />
                                        <span>Follow</span>
                                    </button>
                                    <button className="btn2 flex items-center space-x-2">
                                        <FiShare2 className="w-4 h-4" />
                                        <span>Share</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white border-b border-gray-200">
                <div className="container py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#800000] mb-1">
                                {cultures.length}
                            </div>
                            <div className="text-sm text-gray-600">Cultures</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#800000] mb-1">1.2K</div>
                            <div className="text-sm text-gray-600">Followers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#800000] mb-1">856</div>
                            <div className="text-sm text-gray-600">Following</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#800000] mb-1">3.4K</div>
                            <div className="text-sm text-gray-600">Likes</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="card">
                            <h3 className="text-lg font-semibold text-[#800000] mb-4">About</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Bio</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {isOriginalUser ? (
                                            <span className="text-gray-400 italic">Click edit to add your bio</span>
                                        ) : (
                                            "Passionate about sharing and discovering cultures from around the world. Join me on this journey of cultural exploration and connection."
                                        )}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Location</h4>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <FiMapPin className="w-4 h-4" />
                                        <span className="text-sm">Global Explorer</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Interests</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Cultural Heritage', 'Travel', 'Photography', 'Languages'].map((interest, index) => (
                                            <span key={index} className="px-3 py-1 bg-[#FFF1D6] text-[#800000] text-xs rounded-full">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        {/* Tabs */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200">
                                <div className="flex items-center justify-between p-6">
                                    <div className="flex space-x-8">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
                                                    activeTab === tab.id
                                                        ? 'border-[#800000] text-[#800000] font-semibold'
                                                        : 'border-transparent text-gray-600 hover:text-gray-800'
                                                }`}
                                            >
                                                <span>{tab.label}</span>
                                                {tab.count !== null && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        {tab.count}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {activeTab === 'cultures' && (
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
                                    )}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'cultures' && (
                                    <div>
                                        {cultures.length > 0 ? (
                                            <div className={`grid gap-6 ${
                                                viewMode === 'grid' 
                                                    ? 'grid-cols-1 md:grid-cols-2' 
                                                    : 'grid-cols-1'
                                            }`}>
                                                {cultures.map((c, index) => (
                                                    <CultureList c={c} key={index} viewMode={viewMode} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="text-gray-400 mb-4">
                                                    <FiUser className="w-16 h-16 mx-auto" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                                    No cultures yet
                                                </h3>
                                                <p className="text-gray-500 mb-6">
                                                    {isOriginalUser 
                                                        ? "Start sharing your cultural experiences with the world."
                                                        : "This user hasn't shared any cultures yet."
                                                    }
                                                </p>
                                                {isOriginalUser && (
                                                    <button className="btn1">
                                                        Share Your First Culture
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'about' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#800000] mb-4">Personal Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                    <p className="text-gray-600">{remoteData.result[0].name}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <p className="text-gray-600">{remoteData?.result?.[0]?.email || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                                    <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                    <p className="text-gray-600">Global Explorer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'activity' && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <FiCalendar className="w-16 h-16 mx-auto" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                            Activity Feed
                                        </h3>
                                        <p className="text-gray-500">
                                            Recent activity will appear here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;
