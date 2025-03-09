import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookDetails();
  }, [id]); // Fetch book details whenever the ID changes

  if (!book) return <p>Loading...</p>; // Loading state

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">{book.title}</h1>
      <div className="flex flex-col md:flex-row items-center">
        {book.cover && (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-md mb-4 md:mr-8"
          />
        )}
        <div className="md:w-1/2">
          <p className="text-lg text-gray-800 mb-4">{book.description}</p>
          <p className="text-gray-600 text-sm">Author: {book.author}</p>
          <p className="text-gray-600 text-sm">Published: {book.published}</p>
          {/* Add any other fields you have in your book model */}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
