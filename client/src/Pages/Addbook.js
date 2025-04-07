import React from 'react'
import axios from 'axios'
import { useState } from "react";
import Header from '../Components/Header';

const Addbook = () => {
  const [addbook, setAddBook] = useState({
    book_name: "",
    book_type: "",
    Author: ""
  })
  const handleAddBook = () => {
    axios.post("http://localhost:5000/books/details", addbook)
      .then((res) => {
        alert("Book added successfully!");
        console.log(res.data);
        setAddBook({
          book_name: "",
          book_type: "",
          Author: ""
        }
        )
      })
      .catch((err) => {
        console.error("Error adding book:", err);
      });

  }

  return (
    <div className="container mt-4">
  <Header />
  <h2 className="mb-4">Add New Book</h2>

  <div className="mb-3">
    <input
      type="text"
      name="title"
      className="form-control"
      placeholder="Title"
      value={addbook.book_name}
      onChange={(e) => setAddBook({ ...addbook, book_name: e.target.value })}
    />
  </div>

  <div className="mb-3">
    <input
      type="number"
      name="bookType"
      className="form-control"
      placeholder="Book Type"
      value={addbook.book_type}
      onChange={(e) => setAddBook({ ...addbook, book_type: e.target.value })}
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      name="author"
      className="form-control"
      placeholder="Author"
      value={addbook.Author}
      onChange={(e) => setAddBook({ ...addbook, Author: e.target.value })}
    />
  </div>

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleAddBook}
  >
    Submit
  </button>
</div>

  )
}

export default Addbook
