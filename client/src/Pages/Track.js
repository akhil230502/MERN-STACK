import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

const Track = () => {
    const [history, setHistory] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        console.log("Fetching history for userId:", userId);
        axios.get(`http://localhost:5000/borrowHistory/${userId}`)
            .then((res) => {
                console.log("Response:", res.data);
                setHistory(res.data);
            })
            .catch((err) => console.log("Error fetching history:", err));
    }, [userId]);

    const handleSubmit = (id) => {
        axios.put(`http://localhost:5000/submitBook/${id}`)
            .then((res) => {
                alert('Book submitted successfully');
    
                axios.get(`http://localhost:5000/borrowHistory/${userId}`)
                    .then((res) => {
                        setHistory(res.data);
                    });
            })
            .catch((err) => {
                console.error('Submission failed:', err);
                alert('Submission failed');
            });
    };

    return (
        <div className="container">
            <Header />
            <h3 className="mt-4 mb-3">My Borrowing History</h3>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Book Name</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length > 0 ? (
                            history.map((item) => {
                                const today = new Date().toISOString().split('T')[0];
                                const isOverdue = item.status_name !== 'SUBMITTED' && item.duedate < today;

                                return (
                                    <tr key={item.id} className={isOverdue ? 'table-danger' : ''}>
                                        <td>{item.book_name}</td>
                                        <td>{item.borrowdate}</td>
                                        <td>{item.duedate}</td>
                                        <td>
                                            {item.status_name}
                                            {isOverdue && (
                                                <span className="badge bg-danger ms-2">Overdue</span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleSubmit(item.id)}
                                                disabled={item.status_name === 'SUBMITTED'}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No history found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Track;
