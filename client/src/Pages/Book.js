import React from 'react'
import Header from '../Components/Header'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Book() {
    const [book, setBook] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getAllBooks").then((response) => {
            console.log(response);

            setBook(response.data)

        })
            .catch((err) => console.log("error", err)
            )
    }, []
    )


    return (
        <div className='container'>
            <Header />
            <Link to={"/addbook"}><button type="button" class="btn btn-secondary mt-2 ms-4" >Add Books</button></Link>
            <div className="container mt-4">
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name of the Book</th>
                                <th scope="col">Book Type</th>
                                <th scope="col">Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.book_name}</td>
                                    <td>{data.book_type}</td>
                                    <td>{data.Author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Book
