import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const bgImages = [
    'https://i.pinimg.com/474x/4f/78/a2/4f78a2ac80a385cc2c40e2d633439df7.jpg',
    'https://i.pinimg.com/736x/d9/fe/c0/d9fec0ed0a7d939b37fa4ec115537c16.jpg',
    'https://i.pinimg.com/736x/c1/95/7e/c1957eef7460cde16c6ef758319f2f47.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try{
      const response=await axios.post('http://localhost:8080/api/user/login',formData,{headers:{'Content-Type':'application/json'}});
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('user',response.data.existingUser)
      setMessage({type:'success',text:'Login successful!'});
      console.log(response.data);
      window.location.href='/';
    }catch(error){
      setMessage({type:'error',text:error.response?.data?.message || 'Something went wrong!'});
      console.error(error);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-[#FDF6EC] p-6">
      {/* Login Form */}
      <div className="w-96 p-6 bg-white rounded-md shadow-md flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-center text-[#E29578]">EasyChat</h3>
        <h3 className="text-lg text-[#403D39] ml-2 font-bold">Getting Started</h3>
        <p className="text-[#6D6875] text-sm ml-2">
          Don't have an account? <a href="/signup" className="text-[#E29578] hover:underline">Sign Up</a>
        </p>
        {message && (
          <p className={`text-sm text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {message.text}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email"  
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="border-b border-[#B5838D] p-2 focus:outline-none focus:border-[#E29578] ml-2"
          />
          <input 
            type="password" 
            placeholder="Password" 
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="border-b border-[#B5838D] p-2 focus:outline-none focus:border-[#E29578] ml-2"
          />
          <a href="/forgot-password" className="text-[#E29578] text-sm hover:underline text-right">
            Forgot your password?
          </a>
          <button 
            type="submit" 
            className="bg-[#E29578] text-white py-2 rounded-md hover:bg-[#D67C66] transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Image Section with Transition */}
      <div className="w-96 h-96  relative">
        {bgImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Login Image"
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-md shadow-md transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Login;
