import React, { useState } from "react";
import "./EntrepreneurshipForm.css"; // Import CSS

const EntrepreneurshipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    startupName: "",
    industry: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/entrepreneurship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", graduationYear: "", startupName: "", industry: "" });
      } else {
        setMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="entrepreneurship-form-container">
      <h2>Entrepreneurship Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} required />
        <input type="text" name="startupName" placeholder="Startup Name" value={formData.startupName} onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry Type" value={formData.industry} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntrepreneurshipForm;
