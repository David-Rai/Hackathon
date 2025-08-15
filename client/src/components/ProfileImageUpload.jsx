import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import URL from '../../config';
import { useUser } from '../context/UserContext';

const ProfileImageUpload = ({ setProfileImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const {user,setUser} = useUser()

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("image", file)

    await handleUpload(file);
  };

  const handleStore = async (image_url) => {
    console.log("storing into  the database")
    const { id } = user
    console.log(id)
    try {
      const res = await axios.post(`${URL}/profile/upload`, {
        id, image_url
      })

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const res = await axios.post(`${URL}/upload`, formData);

      const image_url = res.data.image_url;
      // if (setProfileImage) setProfileImage(image_url);
      handleStore(image_url)

      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md">
      <label className="cursor-pointer inline-block">
        <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {isUploading ? 'Uploading...' : 'Choose Image'}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfileImageUpload;
