import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [books, setBooks] = useState({
    title: "",
    description: "",
    price: "",
    cover: null, // Store the file here
  });

  const navigate = useNavigate();



  // Handle file input separately
  const handleFileChange = (e) => {
    setBooks((prev) => ({ ...prev, cover: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", books.title);
    formData.append("description", books.description);
    formData.append("price", books.price);
    formData.append("cover", books.cover); // Append file
  
    try {
      await axios.post("http://localhost:3000/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setBooks((prev) => ({ ...prev, cover: e.target.files[0] })); // Store file object
    } else {
      setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  

  return (
    <div className="container mx-auto p-6 py-32">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Add a New Book
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="flex justify-center gap-10 flex-wrap items-center">
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Price
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="price"
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
              onChange={handleChange}
              name="description"
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-100">
              Cover Image
            </label>
            <input
              type="file"
              onChange={handleFileChange} // Handle files separately
              name="cover"
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              accept="image/*"
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[300px] cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
