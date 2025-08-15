import React, { useEffect } from 'react';
import URL from '../../config'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router'
import UploadButton from '../components/UploadButton'
import { useUser } from '../context/UserContext';

export default function Report() {
    const navigate = useNavigate()
    const { user, setUser } = useUser()
    const socket = useSocket()
    const coordRef = useRef(null)
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(null);
    const image_url = useRef(null)

    const handleChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
        console.log(image)

    };

    useEffect(() => {
        if (!socket) return
        socket.on("added-culture", () => {
            navigate(`/profile/${user.id}`)
        })
    }, [socket])

    useEffect(() => {
        console.log("saved user", user)
    }, [user])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    //Sending the new report to the socket server
    const onSubmit = async (data) => {
        console.log('Form data:', data);
        //storing the image first
        uploadImage(data)
    };

    //uploading the image
    const uploadImage = async (data) => {
        if (!image) return toast.error('Please upload an image');
        setUploading(true); // Disable button
        try {
            const res = await axios.post(`${URL}/upload`, {
                image
            }, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res)
            image_url.current = res.data.image_url
            console.log(image_url)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setUploading(false); // Re-enable button

            await getCoordinates(); // wait for coordinates to be fetched

            if (coordRef.current) {
                const { lat, lng } = coordRef.current;
                const { id, username } = user

                // emitting the data
                socket.emit("new-culture", { ...data, lat, lng, image_url: image_url.current, username, user_id: id });
            } else {
                console.error("Coordinates not available");
            }

        }
    }
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

    return (
        <main className="main flex flex-col items-center justify-center h-[140vh] bg-green-50 p-4 gap-5">

            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl flex flex-col items-start p-8 max-w-lg w-full shadow-lg"
            >
                {/* Title */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        value="we love this culture"
                        {...register('title', { required: 'title is required' })}
                        className="input input-bordered w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="e.g., Waste Management"
                    />
                    {errors.purpose && (
                        <p className="text-red-600 mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Description</label>
                    <textarea
                        rows={4}
                        value="manage hunu paro hai ta"
                        {...register('description', { required: 'Description is required' })}
                        className="input input-bordered w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        placeholder="Describe the issue..."
                    />
                    {errors.description && (
                        <p className="text-red-600 mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Upload Image */}
                <UploadButton handleChange={handleChange} />

                {/* Submit Button */}
                <button
                    disabled={uploading}
                    type="submit"
                    className="btn1 bg-(--secondary) flex items-center justify-center text-white font-semibold py-3 rounded-lg w-full transition"
                >
                    {
                        uploading ? "POSTING...." : "POST"
                    }
                </button>
            </form>

            <ToastContainer />
        </main>
    );
}
