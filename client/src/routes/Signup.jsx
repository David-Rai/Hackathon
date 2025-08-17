import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import URL from '../../config.js';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!user) return;
    if (user.email) navigate('/explore');
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${URL}/signup`, data, { withCredentials: true });
      if (res.data.status) {
        localStorage.setItem('user', JSON.stringify(res.data.payload));
        setUser(res.data.payload);
        navigate('/explore');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FFF1D6] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#800000]">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-[#800000]">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your username"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8800] ${errors.username ? 'border-red-600' : 'border-gray-300'}`}
              {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters' } })}
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#800000]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8800] ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-[#800000]">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8800] ${errors.password ? 'border-red-600' : 'border-gray-300'}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#800000] text-white py-3 rounded-lg font-semibold hover:bg-[#FF8800] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>

          {/* Login prompt */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-[#FF8800] font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
