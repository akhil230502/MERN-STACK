import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Borrow = () => {
    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };
    const [book, setBook] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [borrowDate, setBorrowDate] = useState(getTodayDate());
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/getAllBooks")
            .then((response) => {
                console.log(response);
                setBook(response.data);
            })
            .catch((err) => console.log("error", err));
    }, []);


        const handleBuyClick = (bookItem) => {
            const status = parseInt(bookItem.status_type);
          
            if (status === 1 || status === 2) {
              alert("This book is currently unavailable.");
              return;
            }
          
            setSelectedBook(bookItem);
            setShowModal(true);
        
      };
      
    const handleSubmit = () => {
        const user_id = localStorage.getItem('userId');

        const payload = {
            bookname: selectedBook.book_name,
            status_type: 1,
            borrowdate: borrowDate,
            duedate: dueDate,
            user_id: user_id,
            book_id: selectedBook.id,
        };
        console.log(payload);

        axios.post('http://localhost:5000/books/status', payload)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                if (error.response) {

                    console.error('Server Error:', error.response.data);
                } else if (error.request) {

                    console.error('Network Error:', error.request);
                } else {

                    console.error('Error:', error.message);
                }
            });
    };

    return (
        <div>
            <div className='container'>
                <Header />
                <Link to="/track"><button type="button" className="btn btn-warning mt-2" style={{marginLeft:"1200px"}}>Track</button></Link>
                <div className="table-responsive mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                <th scope="col">Name of the Book</th>
                                <th scope="col">Book Type</th>
                                <th scope="col">Author</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.book_name}</td>
                                    <td>{data.book_type}</td>
                                    <td>{data.Author}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleBuyClick(data)}
                                        >
                                            Buy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {showModal && selectedBook && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Borrow Book</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <p><strong>Book ID:</strong> {selectedBook.id}</p>
                                <p><strong>Book Name:</strong> {selectedBook.book_name}</p>

                                <div className="mb-3">
                                    <label className="form-label">Borrow Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={borrowDate}
                                        onChange={(e) => setBorrowDate(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Borrow;
