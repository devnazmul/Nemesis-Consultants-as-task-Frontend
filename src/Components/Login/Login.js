import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuth } from '../Auth/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, setToken } = useAuth();
    useEffect(() => {
        isAuthenticated && navigate('/');
    }, [isAuthenticated, navigate]);

    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://damp-shore-51847.herokuapp.com/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            swal({ title: "LogIn Successfull!", icon: "success" });
            setIsAuthenticated(true);
            setToken(res.data);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <div className="login_container">
            <div className="login_form_container">

                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1>LogIn</h1>
                        {error && <div className="error_msg"> {error} <button onClick={()=>setError('')}>x</button></div>}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="input"
                        />
                        
                        <button type="submit" className="green_btn">
                            Sing In
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default Login;