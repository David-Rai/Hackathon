import URL from '../../config.js';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext.jsx';

const Signin = () => {
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
      const res = await axios.post(`${URL}/signin`, data, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.payload);
        localStorage.setItem('user', JSON.stringify(res.data.payload));
        navigate('/explore');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FFF1D6] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-[#800000] mb-8">
          Sign In
        </h2>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#800000]">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8800] ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-[#800000]">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8800] ${errors.password ? 'border-red-600' : 'border-gray-300'}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#800000] text-white py-3 rounded-lg font-semibold hover:bg-[#FF8800] transition-colors"
        >
          {isSubmitting ? 'Logging...' : 'Login'}
        </button>

        {/* Signup prompt */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#FF8800] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </main>
  );
};

export default Signin;
