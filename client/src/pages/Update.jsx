import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/${id}`
        );
        console.log("response data", response.data);
        if (response.data) {
          setTitle(response.data.title);
          setDescription(response.data.description); // Corrected
          setPrice(response.data.price); // Corrected
          setCover(response.data.cover); // Corrected
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    FetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/books/${id}`, {
        title,
        description,
        cover,
        price,
      });
      navigate("/books");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6 py-32">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Update Book
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
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
              name="cover"
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[300px] cursor-pointer bg-blue-500  text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
