import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [data, setData] = useState({
        mail: '',
        password_user: ''
    });
    const navigate = useNavigate();
    

    const handleCheckLogin = () => {
        axios.post("http://localhost:5000/login", data)
            .then(res => {
                const { user_id, role_type } = res.data;
                console.log(res);
                if (res.data.message === "Login successful") {
                    console.log('Login successfully');
                    localStorage.setItem("role",role_type);
                    localStorage.setItem("userId",user_id)  
                    navigate('/staff')
                } else {
                    alert('Login failed');
                }
            })
            .catch(err => {
                console.log("catch error", err);
                alert("Error occurred during login");
            });
    };

    return (
        <div className="container">
            <div className="card w-50 mt-3 p-3">
                <h3>LOGIN FORM</h3>

                <label htmlFor="email">Mail:</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, mail: e.target.value })}
                    placeholder="Enter your mail"
                    className="form-control"
                />

                <label htmlFor="password" className="mt-2">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password_user: e.target.value })}
                    placeholder="Enter password"
                    className="form-control"
                />

                <button
                    type="button"
                    className="btn btn-primary mt-3 w-20"
                    onClick={() => handleCheckLogin()}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
