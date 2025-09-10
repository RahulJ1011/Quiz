import React from 'react';
import "../styles/Login.css";
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">LOGIN</h1>
                     
                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email ID</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                       <Link to="/fillup"><button type="submit" className="login-btn">
                            Sign In
                        </button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
