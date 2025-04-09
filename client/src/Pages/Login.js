import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [data, setData] = useState({
        mail: '',
        password_user: ''
    });

    const navigate = useNavigate();

    const handleCheckLogin = () => {

        axios.defaults.withCredentials = true;

        axios.post("http://localhost:5000/login", data)

            .then(res => {
                const { token, user } = res.data;

                // localStorage.setItem("token", token); 
                localStorage.setItem("role", user.role_type);
                localStorage.setItem("userId", user.user_id);

                navigate('/staff');
            });
    };

  

    return (
        <div className="container">
            <div className="card w-50 mt-3 p-3">
                <h3>LOGIN FORM</h3>

                <label htmlFor="mail">Mail:</label>
                <input
                    type="email"
                    name="mail"
                    value={data.mail}
                    onChange={(e) => setData({ ...data, mail: e.target.value })}
                    placeholder="Enter your mail"
                    className="form-control"
                />

                <label htmlFor="password_user" className="mt-2">Password:</label>
                <input
                    type="password"
                    name="password_user"
                    value={data.password_user}
                    onChange={(e) => setData({ ...data, password_user: e.target.value })}
                    placeholder="Enter password"
                    className="form-control"
                />

                <button
                    type="button"
                    className="btn btn-primary mt-3 w-20"
                    onClick={handleCheckLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;
