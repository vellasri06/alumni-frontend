import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AlumniList from "./components/AlumniList";
import AdminDashboard from "./components/AdminDashboard";
import Gallery from "./components/Gallery"; // ✅ Import Admin Dashboard
import Events from "./components/Events";
import Forum from "./components/Form";
import Users from "./components/User";
import Course from "./components/Courselist";
import JobBoard from "./components/Jobs";
import HomePage from "./components/Home";
import Registrations from "./components/Registrations";
import PlacementForm from "./components/PlacementForm";
import HigherEducationForm from "./components/HigherEducationForm";
import EntrepreneurshipForm from "./components/EntrepreneurshipForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alumnilist" element={<AlumniList />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/gallery"element={<Gallery/>} />{/* ✅ Ensure this exists */}
        <Route path="/event"element={<Events/>}/>
        <Route path="/forum"element={<Forum/>}/>
        <Route path="/user"element={<Users/>}/>
        <Route path="/courselist"element={<Course/>}/>
        <Route path="/jobs"element={<JobBoard/>}/>
        <Route path="/home"element={<HomePage/>}/>
        <Route path="/registrations"element={<Registrations/>}/>
        <Route path="/registrations/placement" element={<PlacementForm />} />
        <Route path="/registrations/higher-education" element={<HigherEducationForm />} />
        <Route path="/registrations/entrepreneurship" element={<EntrepreneurshipForm />} />
      </Routes>
    </Router>
  );
};

export default App;
