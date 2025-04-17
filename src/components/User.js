import React, { useState, useEffect } from "react";
import "./Users.css"; // Importing styles

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    batch: "",
    profession: "",
  });

  // Sample user data (Replace with API call if needed)
  useEffect(() => {
    const alumniData = [
      { id: 1, name: "Rahul Sharma", email: "rahul@example.com", batch: "2018", profession: "Software Engineer" },
      { id: 2, name: "Aditi Verma", email: "aditi@example.com", batch: "2017", profession: "Data Scientist" },
      { id: 3, name: "Vikram Rao", email: "vikram@example.com", batch: "2019", profession: "Entrepreneur" },
      { id: 4, name: "Sneha Kapoor", email: "sneha@example.com", batch: "2020", profession: "Cybersecurity Analyst" },
    ];
    setUsers(alumniData);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.batch || !newUser.profession) {
      alert("Please fill in all fields.");
      return;
    }

    const existingUser = users.find((user) => user.name.toLowerCase() === newUser.name.toLowerCase());

    if (!existingUser) {
      const newUserData = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        batch: newUser.batch,
        profession: newUser.profession,
      };

      setUsers([...users, newUserData]);
      alert(`${newUser.name} has been added.`);
      setNewUser({ name: "", email: "", batch: "", profession: "" }); // Clear input fields
    } else {
      alert("User with this name already exists.");
    }
  };

  // Remove user by searching name
  const handleRemoveUser = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a name to remove.");
      return;
    }

    const existingUser = users.find((user) => user.name.toLowerCase() === searchTerm.toLowerCase());

    if (existingUser) {
      const updatedUsers = users.filter((user) => user.id !== existingUser.id);
      setUsers(updatedUsers);
      alert(`${searchTerm} has been removed.`);
      setSearchTerm("");
    } else {
      alert("User not found.");
    }
  };

  return (
    <div className="users-container">
      <h2>🎓 Alumni Directory</h2>

      {/* Add User Form */}
      <div className="add-user-form">
        <input type="text" name="name" placeholder="Full Name" value={newUser.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
        <input type="text" name="batch" placeholder="Batch Year" value={newUser.batch} onChange={handleInputChange} />
        <input type="text" name="profession" placeholder="Profession" value={newUser.profession} onChange={handleInputChange} />
        <button className="add-btn" onClick={handleAddUser}>✅ Add User</button>
      </div>

      {/* Search & Remove User */}
      <div className="search-container">
        <input type="text" placeholder="🔍 Search & Remove User..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="remove-btn" onClick={handleRemoveUser}>❌ Remove</button>
      </div>

      {/* Alumni List */}
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>🎓 Batch:</strong> {user.batch}</p>
              <p><strong>💼 Profession:</strong> {user.profession}</p>
            </div>
          ))
        ) : (
          <p className="no-users">No alumni found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;