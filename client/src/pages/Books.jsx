import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; // Install react-intersection-observer for animation
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setBooks(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 py-32">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12 animate__animated animate__fadeIn">
        Book Collection
      </h1>
      <div className="flex justify-end items-center pb-6">
        <button className="bg-blue-500 w-[200px] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Add New Book
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((item) => (
          <BookCard key={item.id} book={item} />
        ))}
      </div>
    </div>
  );
};

const BookCard = ({ book }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Trigger when 20% of the card is in view
  });

  return (
    <div
      ref={ref}
      className={`${
        inView ? "animate__animated animate__fadeInUp" : "opacity-0"
      } bg-white p-4 rounded-lg w-fit min-w-[250px] lg:min-w-[300px] flex-col flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {book.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4">{book.description}</p>
      <p className="text-base font-semibold text-gray-800 mb-2">
        {book.price} Birr
      </p>
      <Link to={`/books/${book.id}`}>
        {" "}
        <button className="bg-blue-500 w-[250px] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Learn More
        </button>
      </Link>
    </div>
  );
};

export default Books;
