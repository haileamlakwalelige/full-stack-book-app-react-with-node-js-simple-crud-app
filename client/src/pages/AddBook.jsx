// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AddBook = () => {




  return (
    <div className="container mx-auto p-6 py-32">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Add a New Book
      </h1>
      <form  className="space-y-6 ">
        <div className="flex justify-center gap-10 flex-wrap items-center">
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="flex justify-center gap-10 flex-wrap items-center">
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Cover Image URL
            </label>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[300px] bg-blue-500  text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
