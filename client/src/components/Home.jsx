import React, { useState, useEffect } from "react";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const category=[
    { id: 1, name: 'Abstract Art' },
    { id: 2, name: 'Portraits' },
    { id: 3, name: 'Landscape Art' },
    { id: 4, name: 'Still Life' },
    { id: 5, name: 'Modern Art' },
    { id: 6, name: 'Pop Art' },
    { id: 7, name: 'Surrealism' },
    { id: 8, name: 'Impressionism' },
    { id: 9, name: 'Cubism' },
    { id: 10, name: 'Classical Art' },
  ]
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500); // Delay for smooth transition
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FDF6EC]">
      {/* Background Image with Transition */}
      <img
        src="https://i.pinimg.com/736x/ec/6a/70/ec6a70f5b53e5a901833b1debef70397.jpg"
        alt="Beautiful Art"
        className={`w-[100%] h-[150px] object-cover`}
      />
      <div className="mt-4 p-6 flex gap-x-4 ">
       <div className="flex flex-col w-96 items-center bg-white shadow-lg p-4 rounded-lg">
        <img src={user.profileImg ||"https://i.pinimg.com/474x/90/23/0c/90230c2f9f75fa9d65dd27d0736dfcb8.jpg"} className="w-25 rounded-full" alt=""/>
        <div className="flex items-center  gap-x-2 mt-4">
        <span className="text-sm">Username:</span>
        <h1 className="text-[#E29578] text-sm">{user.username}</h1>
        </div>
        <div className="flex items-center  gap-x-2">
        <span className="text-sm text-start">Email:</span>
        <h1 className="text-[#E29578] text-sm">{user.email}</h1>
        </div>
        <button 
            type="submit" 
            className="bg-[#E29578] text-white p-[10px]  mt-4 rounded-md hover:bg-[#D67C66] transition duration-200"
          >
           Edit Profile
          </button>
       </div>
       <div>
        <div className="flex items-center justify-between">
           <h1>
            Categories:
           </h1>
           
        </div>
       </div>
      </div>
    </div>
  );
}

export default Home;

