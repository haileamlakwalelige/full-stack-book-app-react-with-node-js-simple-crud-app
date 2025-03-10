import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null); // Cover file
  const [preview, setPreview] = useState(""); // Preview the uploaded image
  const [existingCoverUrl, setExistingCoverUrl] = useState(""); // Store the current cover URL

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the book details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/${id}`
        );
        if (response.data) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setPrice(response.data.price);
          setExistingCoverUrl(response.data.cover); // Save the existing cover URL
          setPreview(response.data.cover); // Show the existing cover preview
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle the file change for the cover image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    setPreview(URL.createObjectURL(file)); // Show preview of the selected image
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    // If no new cover is selected, send the existing cover URL
    if (cover) {
      formData.append("cover", cover);
    } else {
      formData.append("cover", existingCoverUrl); // Existing cover from the backend
    }

    try {
      await axios.put(`http://localhost:3000/api/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 py-32">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Update Book
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
              Cover Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              name="cover"
              className="mt-2 w-full min-w-[350px] px-4 py-2 border border-gray-300 rounded-md"
              accept="image/*"
            />
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-2 w-40 h-40 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[300px] cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
