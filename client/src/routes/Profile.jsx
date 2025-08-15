import React, { useEffect, useState } from 'react';
import CultureList from '../components/CultureList.jsx'
import Nav from '../components/Nav.jsx';
import { useParams, Outlet, NavLink } from 'react-router';
import axios from 'axios';
import ProfileImageUpload from '../components/ProfileImageUpload.jsx'
import URL from '../../config.js';
import { useSocket } from '../context/SocketContext.jsx';
import { useUser } from '../context/UserContext.jsx';

const Profile = () => {
    const { user, setUser } = useUser()
    const { user_id } = useParams();
    const socket = useSocket()
    const [ProfileImage, setProfileImage] = useState(null)
    const [remoteData, setRemoteData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [cultures, setCultures] = useState([])
    const [isOriginalUser, setIsOriginalUser] = useState(false)

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
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-gray-500 text-lg">Loading user data...</p>
            </main>
        );
    }

    return (
        <main className="p-6 space-y-6 bg-[#F9FAF8] min-h-screen">
            <Nav />
            {/* User Info & Banner Section */}
            <section
                className="flex flex-col md:flex-row items-start bg-white gap-6 p-6  md:items-center rounded-xl border border-gray-300 shadow-md"
            >
                {/* Profile Image & Info */}
                <div className="w-full md:h-full md:w-1/3 flex flex-col items-center gap-4 md:items-center justify-center" >
                    <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-green-500 bg-white">
                        <img
                            src={remoteData.result[0].image_url || "https://thispersondoesnotexist.com"}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* change profile image */}
                    {
                        isOriginalUser &&
                        (<ProfileImageUpload ProfileImage={ProfileImage} setProfileImage={setProfileImage} />)}
                </div>

                {/* Banner Image */}
                <div className="relative w-full md:w-2/3 aspect-[3/1] rounded-lg overflow-hidden shadow-md">
                    <img
                        src="https://img.pikbest.com/backgrounds/20200522/world-environment-day-banner-background_1910636.jpg!sw800"
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                    <button
                        className="absolute bottom-4 right-4 px-4 py-2 rounded-md font-semibold shadow bg-white text-sky-500 hover:bg-gray-100 transition"
                    >
                        Add Banner
                    </button>
                </div>
            </section>

            {/* Tabs & Content Section */}
            <section
                className="bg-white rounded-xl border border-gray-300 shadow-md p-4 md:p-6 space-y-4"
            >
                {/* Content Area: user info left, nested routes right */}
                <div className="flex flex-col md:flex-row gap-6 bg-gray-100 rounded-md p-4">
                    {/* User details (left side) */}
                    <aside className="md:w-1/3 bg-white p-6 rounded-md shadow-sm text-gray-800 h-[60vh] flex flex-col">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">User Details</h2>

                        <div className="space-y-2 mb-6">
                            <p>
                                <strong>Username:</strong> {remoteData.result[0].name}
                            </p>
                            <p>
                                <strong>Email:</strong> {remoteData?.result?.[0]?.email || 'Not provided'}
                            </p>
                        </div>

                        <section className="flex-grow bg-gray-50 p-4 rounded-md shadow-inner overflow-auto">
                            <h3 className="font-semibold mb-2">Bio</h3>
                            <p className="text-gray-600">
                                [Add user bio here]
                            </p>
                        </section>
                    </aside>


                    {/* cultures */}
                    <div className="md:w-2/3 p-4 rounded-md">
                        {
                            cultures.length > 0 && cultures.map((c, index) => {
                                return <CultureList c={c} key={index} />
                            })
                        }
                    </div>
                </div>
            </section>


        </main>
    );
};

export default Profile;
