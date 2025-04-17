import React, { useState, useEffect } from "react";
import "./PlacementForm.css"; // Import CSS

const PlacementForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passedOutYear: "",
    companyName: "",
    designation: "",
    permanentAddress: "",
    regNo: ""
  });

  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false); // ✅ Fix: Declare refresh state
  const backendURL = "https://alumni-backend-1-b38f.onrender.com";
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          name: "",
          email: "",
          passedOutYear: "",
          companyName: "",
          designation: "",
          permanentAddress: "",
          regNo: ""
        });

        // ✅ Notify the Alumni List to refresh after successful registration
        window.dispatchEvent(new Event("refreshAlumni"));
      } else {
        setMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  // ✅ Listen for refresh event
  useEffect(() => {
    const handleRefresh = () => {
      setRefresh((prev) => !prev); // Toggle refresh state
    };

    window.addEventListener("refreshAlumni", handleRefresh);

    return () => {
      window.removeEventListener("refreshAlumni", handleRefresh);
    };
  }, []);

  // ✅ Fetch updated alumni list on refresh
  useEffect(() => {
    fetch("http://localhost:5001/api/alumnis")
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated Alumni List:", data); // Debugging
      })
      .catch((err) => console.error("❌ Alumni Fetch Error:", err));
  }, [refresh]);

  return (
    <div className="placement-form-container">
      <h2>Placement Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="passedOutYear" placeholder="Graduation Year" value={formData.passedOutYear} onChange={handleChange} required />
        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
        <input type="text" name="permanentAddress" placeholder="Address" value={formData.permanentAddress} onChange={handleChange} required />
        <input type="text" name="regNo" placeholder="REGNO" value={formData.regNo} onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Position" value={formData.designation} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PlacementForm;
