import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Dashboard.css";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState(""); // Add state for username
  const [password, setPassword] = useState(""); // Add state for password
  const [loginError, setLoginError] = useState(""); // Add state for login error message
  const updates = [
    "New job postings available!",
    "Upcoming Alumni Meet 2025",
    "Mentorship program registration open!",
  ];
  const [chatOpen, setChatOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!"
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle login form submission
  const handleAdminLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Replace with your login validation logic
    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      navigate("/admin-dashboard"); // Redirect to the admin dashboard after successful login
    } else {
      setLoginError("Incorrect username or password");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Alumni Management System</h2>
        <ul className="nav-links">
          <li><a href="/home">🏠 Home</a></li>
          <li><a href="/gallery">🖼 Gallery</a></li>
          <li><a href="/courselist">📚 Course List</a></li>
          <li><a href="/AlumniList">👨‍🎓 Alumni List</a></li>
          <li><a href="/jobs">💼 Jobs</a></li>
          <li><a href="/event">📅 Events</a></li>
          <li><a href="/forum">💬 Forum</a></li>
          <li><a href="/user">👥 Users</a></li>
          <li><a href="/registrations">📝 Registrations</a></li>
          <li><a href="/settings">⚙ System Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <h3>{greeting} Welcome back!</h3>
          <div className="admin-menu" ref={dropdownRef}>
            <img
              src="https://png.pngtree.com/png-clipart/20221227/original/pngtree-host-and-admin-marketing-job-vacancies-vector-png-image_8815346.png"
              alt="Admin"
              className="admin-avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <h4>Admin Login</h4>
                <form onSubmit={handleAdminLogin}>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Login</button>
                </form>
                {loginError && <p className="error-message">{loginError}</p>}
              </div>
            )}
          </div>
        </header>

        {/* Scrolling Caption */}
        <div className="scrolling-caption-container">
          <div className="scrolling-caption">
            🎉 Latest updates and announcements! Stay tuned for exciting news and events in the alumni network.
          </div>
        </div>

        <section className="dashboard-cards">
          <div className="card blue">
            <h3>Alumni Network</h3>
            <p>Connect with thousands of alumni worldwide!</p>
          </div>
          <div className="card teal">
            <h3>Mentorship</h3>
            <p>Find mentors or become one.</p>
          </div>
          <div className="card yellow">
            <h3>Job Listings</h3>
            <p>Check the latest opportunities posted by alumni.</p>
          </div>
        </section>

        <section className="updates">
          <h2>📢 Latest Updates</h2>
          <ul>
            {updates.map((update, index) => (
              <li key={index} className="fade-in">{update}</li>
            ))}
          </ul>
        </section>

        <button onClick={() => setChatOpen(!chatOpen)} className="chat-button">
          💬 Chat with Alumni
        </button>
        {chatOpen && <div className="chat-window">🚀 Quick Chat Feature Coming Soon!</div>}
      </div>
    </div>
  );
};

export default Dashboard;
