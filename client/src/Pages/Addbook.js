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
    <div>
      <Header />
      <h2>Add New Book</h2>
      <input type='text' name="title" placeholder="Title" value={addbook.book_name} onChange={(e) => setAddBook({ ...addbook, book_name: e.target.value })} />
      <input type='number' name="bookType" placeholder="bookType" value={addbook.book_type} onChange={(e) => setAddBook({ ...addbook, book_type: e.target.value })} />
      <input name="author" placeholder="Author" onChange={(e) => setAddBook({ ...addbook, Author: e.target.value })} />

      <button type="button" class="btn btn-secondary mt-2 ms-4" onClick={() => handleAddBook()}>Submit</button>


    </div>
  )
}

export default Addbook
