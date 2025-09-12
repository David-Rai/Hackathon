import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiUpload, FiImage } from 'react-icons/fi';

const UploadButton = ({ handleChange }) => {
    const [preview, setPreview] = useState(null);
    const [filename, setFilename] = useState('');

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFilename(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        handleChange(e); // Call the original handler
    };

    return (
        <div className="w-full mb-6">
            <label className="block text-(--primary) font-semibold mb-2">Upload Image</label>
            <div className="relative">
                <input
                    type="file"
                    id="report-image"
                    name="report-image"
                    onChange={onFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                />
                <div className="flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-orange-300 rounded-lg bg-[#F9FAF8]  transition-colors group">
                    {!preview ? (
                        <div className="flex flex-col items-center text-center">
                            <FiImage className="w-8 h-8 text-(--primary) mb-2 group-hover:text-orange-600" />
                            <p className="text-orange-800 mb-1">
                                <span className="font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-sm bg-[#F9FAF8]">PNG, JPG, JPEG (Max. 5MB)</p>
                            <div className="mt-3 px-4 py-2 bg-(--primary) text-white rounded-md text-sm flex items-center">
                                <FiUpload className="mr-2" />
                                Select File
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto mb-2" />
                            <p className="text-sm text-green-800 font-medium">{filename}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadButton;
