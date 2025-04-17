import React, { useState } from "react";
import "./HigherEducationForm.css"; // Import CSS

const HigherEducationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    university: "",
    course: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/higher-education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", graduationYear: "", university: "", course: "" });
      } else {
        setMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="higher-education-form-container">
      <h2>Higher Education Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} required />
        <input type="text" name="university" placeholder="University Name" value={formData.university} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course Name" value={formData.course} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HigherEducationForm;
