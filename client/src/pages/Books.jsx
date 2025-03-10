import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

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
      <Link to="/add">
        <div className="flex justify-end items-center pb-6">
          <button className="bg-blue-500 cursor-pointer w-[200px] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add New Book
          </button>
        </div>
      </Link>
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

  const handleDelete = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      console.log(" the data is deleted successfully!");
      // navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={ref}
      className={`${
        inView ? "animate__animated animate__fadeInUp" : "opacity-0"
      } bg-white p-4 rounded-lg w-fit min-w-[250px] lg:min-w-[300px] flex-col flex shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-center gap-2 justify-end">
        <Link to={`/update/${book.id}`}>
          <FaRegEdit size={20} className="text-blue-500 cursor-pointer" />
        </Link>
        <MdAutoDelete
          size={20}
          className="text-red-500 cursor-pointer"
          onClick={(e) => handleDelete(book.id, e)}
        />
      </div>
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
        {book.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4 text-center">
        {book.description}
      </p>
      <p className="text-base font-light text-blue-800 text-center mb-2">
        {book.price} Birr
      </p>
      <Link
        to={`/books/${book.id}`}
        className="flex items-center justify-center"
      >
        {" "}
        <button className="bg-blue-500 w-[250px] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Learn More
        </button>
      </Link>
    </div>
  );
};

export default Books;
