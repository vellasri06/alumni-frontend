import React from "react";
import { Link } from "react-router-dom";
import "./Registrations.css";

const Registrations = () => {
  return (
    <div className="registrations-container">
      <h2 className="heading">Select a Registration Type</h2>
      <div className="options-grid">
        <Link to="/registrations/placement" className="option-card blue">Placement</Link>
        <Link to="/registrations/higher-education" className="option-card teal">Higher Education</Link>
        <Link to="/registrations/entrepreneurship" className="option-card green">Entrepreneurship</Link>
        
      </div>
    </div>
  );
};

export default Registrations;
