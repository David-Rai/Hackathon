import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import URL from '../../config';
import { useUser } from '../context/UserContext';
import { FiUpload, FiX, FiCheck } from 'react-icons/fi';

const ProfileImageUpload = ({ setProfileImage, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user, setUser } = useUser();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    await handleUpload(file);
  };

  const handleStore = async (image_url) => {
    const { id } = user;
    try {
      const res = await axios.post(`${URL}/profile/upload`, {
        id, image_url
      });
      
      if (setProfileImage) setProfileImage(image_url);
      setUser(prev => ({ ...prev, image_url }));
      setPreviewImage(null);
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile picture");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const res = await axios.post(`${URL}/upload`, formData);
      const image_url = res.data.image_url;
      await handleStore(image_url);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      {/* Upload Button */}
      <button
        onClick={handleGalleryClick}
        className="absolute -bottom-2 -right-2 bg-[#800000] text-white p-2 rounded-full shadow-lg hover:bg-[#660000] transition-all duration-200 hover:scale-110"
        disabled={isUploading}
        title="Choose from Gallery"
      >
        {isUploading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FiUpload className="w-4 h-4" />
        )}
      </button>



      {/* Preview Overlay */}
      {previewImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={handleRemovePreview}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Confirm upload
                setPreviewImage(null);
              }}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <FiCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
        className="hidden"
      />


    </div>
  );
};

export default ProfileImageUpload;
