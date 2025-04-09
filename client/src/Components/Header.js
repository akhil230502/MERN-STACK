import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const role = parseInt(localStorage.getItem("role"));

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    axios.get("http://localhost:5000/verify-token", { withCredentials: true })
      .then((res) => {
        console.log(" Token is valid:", res.data);
      })
      .catch((err) => {
        console.error(" Token missing or invalid:", err.response?.data || err.message);
        navigate("/login");
      });
  }, [navigate]);

  
  const handleLogout = () => {
    axios.get("http://localhost:5000/logout", { withCredentials: true })
    .then(res => {
      console.log(res.data.message);
      navigate("/login"); 
    })
    .catch(err => {
      console.error("Logout failed:", err);
    });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div className="collapse navbar-collapse" id="navbarText">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>

              {(role === 1 || role === 2) && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/book">Books</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user">Users</Link>
                  </li>
                </>
              )}

              {role === 3 && (
                <li className="nav-item">
                  <Link className="nav-link" to="/borrow">Borrow</Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown" style={{ position: 'relative' }}>
                <span onClick={toggleDropdown} style={{ cursor: 'pointer', fontSize: "1.5rem", paddingLeft: "10px" }}>
                  <CgProfile />
                </span>
                {showDropdown && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', top: '30px', right: '0' }}>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}


export default Header
