import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage({ type: 'success', text: 'Registration successful!' });
      console.log(response.data);
      window.location.href = '/login';
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong!' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#FDF6EC]'>
      <div className='flex flex-col gap-4 bg-white p-6 w-96 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold text-[#E29578] text-center'>EasyChat</h1>
        <h1 className='text-xl font-bold text-[#E29578]'>Getting started</h1>
        <p className='text-[#6D6875] text-sm'>
          Already have an account? <a href='/login' className='text-[#E29578] hover:underline'>Sign In</a>
        </p>

        {message && (
          <p className={`text-sm text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {message.text}
          </p>
        )}

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='border-b border-[#B5838D] p-2 focus:outline-none focus:border-[#E29578]'
            required
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='border-b border-[#B5838D] p-2 focus:outline-none focus:border-[#E29578]'
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='border-b border-[#B5838D] p-2 focus:outline-none focus:border-[#E29578]'
            required
          />
          <button
            type='submit'
            className='bg-[#E29578] text-white py-2 rounded-md hover:bg-[#D67C66] transition duration-200 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
