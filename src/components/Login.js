import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Login.css'; // Ensure this file exists

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!regNo || !password) {
      setError("Both registration number and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/users/login", {
        regNo,
        password,
      });

      if (response.status === 200) {
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard on successful login
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="https://tse4.mm.bing.net/th?id=OIP.3QiTYxeVRkuXZKYtKaFVcgHaHY&pid=Api&P=0&h=180" 
          alt="University Logo" 
          className="university-logo" 
        />
        
        <h2>University Alumni Portal</h2>

        {/* Display error message if login fails */}
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleLogin}>
          {/* Registration Number Field */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="toggle-password" onClick={togglePassword}>
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Alternative Login Options */}
        <div className="social-login">
          <button className="google-login">Login with Google</button>
          <button className="linkedin-login">Login with LinkedIn</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
