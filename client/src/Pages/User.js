import React from 'react'
import Header from '../Components/Header'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function User() {

  const[user,setUser]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/getAllUser")
    .then((response) => {
      setUser(response.data)})
      .catch((err) => console.log("error", err)
      )
}, []
)


  return (
    <div className='container'>
      <Header />
      <Link to={"/adduser"}><button type="button" class="btn btn-secondary mt-2 ms-4">Add User</button></Link>
      <div className="container mt-4">
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th scope="col">Name of the User</th>
          <th scope="col">Department</th>
          <th scope="col">Mail</th>
        </tr>
      </thead>
      <tbody>
        {user.map((data, index) => (
          <tr key={index}>
            <td>{data.username}</td>
            <td>{data.department}</td>
            <td>{data.mail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  )
}

export default User
