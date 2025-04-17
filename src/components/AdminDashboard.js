import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [alumni, setAlumni] = useState([]);
  const [editingAlumnus, setEditingAlumnus] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState("");

  // Fetch alumni data from MongoDB
  useEffect(() => {
    axios.get("http://localhost:5001/api/alumnis")
      .then(response => setAlumni(response.data))
      .catch(error => console.error("Error fetching alumni:", error));
  }, []);

  // Enable editing for a selected alumnus
  const handleEdit = (alumnus) => {
    setEditingAlumnus(alumnus._id);
    setUpdatedData({ ...alumnus });
  };

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Save updated details to MongoDB
  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/alumnis/update/${id}`,
        updatedData
      );

      setMessage(response.data.message);

      // Refresh alumni list after update
      setAlumni(alumni.map(al => (al._id === id ? response.data.updatedAlumnus : al)));

      setEditingAlumnus(null);
    } catch (error) {
      console.error("Error updating alumni:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {message && <p className="success-message">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((alumnus) => (
            <tr key={alumnus._id}>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="text"
                    name="regNo"
                    value={updatedData.regNo}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.regNo
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.name
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="text"
                    name="companyName"
                    value={updatedData.companyName}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.companyName
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="text"
                    name="designation"
                    value={updatedData.designation}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.designation
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="text"
                    name="studentMobile"
                    value={updatedData.studentMobile}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.studentMobile
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleChange}
                  />
                ) : (
                  alumnus.email
                )}
              </td>
              <td>
                {editingAlumnus === alumnus._id ? (
                  <button onClick={() => handleSave(alumnus._id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(alumnus)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
