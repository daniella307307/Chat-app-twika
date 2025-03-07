import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getCategories = async () => {
    if (!token) {
      console.error("No token found. User might be unauthorized.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/art/category/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data); // Debugging purpose

      if (response.data?.categories?.length > 0) {
        setCategories(response.data.categories);
      } else {
        console.warn("No categories found.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error);
    }
  };

  useEffect(() => {
    getCategories(); // Fetch categories on component mount
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
        className="w-[100%] h-[150px] object-cover"
      />

      <div className="mt-4 p-6 flex gap-x-4">
        {/* Profile Card */}
        <div className="flex flex-col w-96 items-center bg-white shadow-lg p-4 rounded-lg">
          <img
            src={
              user.profileImg ||
              "https://i.pinimg.com/474x/90/23/0c/90230c2f9f75fa9d65dd27d0736dfcb8.jpg"
            }
            className="w-25 rounded-full"
            alt="Profile"
          />
          <div className="flex items-center gap-x-2 mt-4">
            <span className="text-sm">Username:</span>
            <h1 className="text-[#E29578] text-sm">{user.username}</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-sm text-start">Email:</span>
            <h1 className="text-[#E29578] text-sm">{user.email}</h1>
          </div>
          <button
            className="bg-[#E29578] text-white p-[10px] mt-4 rounded-md hover:bg-[#D67C66] transition duration-200"
            onClick={handleLogout} // 🔥 Fixed here
          >
            Logout
          </button>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Categories:</h1>
          </div>
          <div className="mt-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <h1 key={category._id} className="text-sm text-[#6D6875]">
                  {category.name}
                </h1>
              ))
            ) : (
              <h1 className="text-sm text-red-500">No categories available</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
