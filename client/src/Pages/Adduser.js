import React from 'react'
import Header from '../Components/Header'
import { useEffect, useState } from "react";
import axios from 'axios'

const Adduser = () => {
  const [adduser, setAddUser] = useState({
    username: "",
    department: "",
    mail: "",
    password_user: "",
    role_type: ""
  })

  const [roles, setRoles] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/getAllRoles")
      .then((response) => {
        setRoles(response.data)
      })
      .catch((err) => console.log("error", err)
      )
  }, []
  )
  const handleAddUser = () => {
    if (!adduser.username || !adduser.department || !adduser.mail) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("http://localhost:5000/user/add", adduser)
      .then((res) => {
        alert("User added successfully!");
        console.log(res.data);
        setAddUser({
          username: "",
          department: "",
          mail: "",
          password_user: "",
          role_type: ""
        }
        )
      })
      .catch((err) => {
        console.error("Error adding user:", err.response?.data || err.message);
      });

  }

  return (
    <div className="container mt-4">
  <Header />
  <h3 className="mb-4">Add User</h3>

  <div className="mb-3">
    <input type="text" className="form-control"placeholder="Enter username"
      value={adduser.username} onChange={(e) => setAddUser({ ...adduser, username: e.target.value })}
    />
  </div>

  <div className="mb-3">
    <input type="text"className="form-control"placeholder="Enter department"
      value={adduser.department} onChange={(e) => setAddUser({ ...adduser, department: e.target.value })}
    />
  </div>

  <div className="mb-3">
    <input type="email" className="form-control" placeholder="Enter mail"
      value={adduser.mail} onChange={(e) => setAddUser({ ...adduser, mail: e.target.value })}
    />
  </div>

  <div className="mb-3">
    <input type="password" className="form-control" placeholder="Enter password"
      value={adduser.password_user} onChange={(e) => setAddUser({ ...adduser, password_user: e.target.value })}
    />
  </div>

  <div className="mb-4">
    <select className="form-select" value={adduser.role_type} onChange={(e) => setAddUser({ ...adduser, role_type: e.target.value })}
    >
      <option value="">Select Role</option>
      {roles.map((role) => (
        <option key={role.id} value={role.id}>{role.roles}</option>
      ))}
    </select>
  </div>

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleAddUser}
  >
    Submit
  </button>
</div>)
}

export default Adduser
