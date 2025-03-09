// src/App.js
import React from "react";
import { FaBookOpen, FaUserPlus } from "react-icons/fa"; // Importing book and user icons from react-icons

const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d3d38f6f2966?fit=crop&w=500&h=500&q=80")', // Background image
      }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-40"></div> Dark overlay for text contrast */}

      <div className="flex items-center justify-center min-h-full text-center text-white relative z-10">
        <div className="px-4 py-8 md:px-16 md:py-12">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-gradient">
            Welcome to Bookify
          </h1>
          <p className="text-xl mb-6 max-w-lg mx-auto animate-fadeIn">
            Your gateway to endless adventures. Discover, read, and explore books
            from all genres. Find your next favorite read now.
          </p>
          <div className="space-x-4 flex gap-3 items-center justify-center flex-wrap">
            <a
              href="#explore"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaBookOpen className="inline-block mr-2 text-xl" />
              Explore Books
            </a>
            <a
              href="#signup"
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaUserPlus className="inline-block mr-2 text-xl" />
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Book Categories or Popular Books */}
      <div className="lg:absolute -mt-20 lg:-mt-0 lg:bottom-10 left-0 right-0 flex flex-wrap gap-10 justify-center space-x-6 text-white">
        <div className="bg-opacity-70 bg-white text-black rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Fiction</h3>
          <p>Explore the world of fiction books</p>
        </div>
        <div className="bg-opacity-70 bg-white text-black rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Non-Fiction</h3>
          <p>Learn something new every day</p>
        </div>
        <div className="bg-opacity-70 bg-white text-black rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Science Fiction</h3>
          <p>Discover futuristic stories</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
