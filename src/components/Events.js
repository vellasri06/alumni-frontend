import React, { useState, useEffect } from "react";
import "./Events.css";

const Events = () => {
  const [registeredEvents, setRegisteredEvents] = useState(
    JSON.parse(localStorage.getItem("registeredEvents")) || []
  );
  const [alumniEvents, setAlumniEvents] = useState(
    JSON.parse(localStorage.getItem("alumniEvents")) || [
      {
        id: 1,
        title: "Annual Alumni Meetup 2025",
        date: "2025-05-10",
        time: "6:00 PM",
        venue: "VFSTR University, Guntur",
        description: "Reconnect with old friends and network with alumni.",
      },
      {
        id: 2,
        title: "Alumni Tech Talk: AI & ML Trends",
        date: "2025-06-15",
        time: "4:00 PM",
        venue: "Online (Zoom)",
        description: "Join top alumni for a discussion on AI & ML trends in 2025.",
      },
    ]
  );

  const [activeTab, setActiveTab] = useState("today");
  const [editEvent, setEditEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", venue: "", description: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("alumniEvents", JSON.stringify(alumniEvents));
  }, [alumniEvents]);

  const today = new Date().toISOString().split("T")[0];
  const todayEvents = alumniEvents.filter((event) => event.date === today);
  const upcomingEvents = alumniEvents.filter((event) => event.date > today);
  const pastEvents = alumniEvents.filter((event) => event.date < today);

  const handleEditClick = (event) => {
    setEditEvent(event);
  };

  const handleSaveEdit = () => {
    setAlumniEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === editEvent.id ? editEvent : event))
    );
    setEditEvent(null);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.venue || !newEvent.description) {
      alert("Please fill all fields.");
      return;
    }
    const updatedEvents = [...alumniEvents, { ...newEvent, id: alumniEvents.length + 1 }];
    setAlumniEvents(updatedEvents);
    setNewEvent({ title: "", date: "", time: "", venue: "", description: "" });
    setShowAddForm(false);
  };
  
  return (
    
    <div className="events-container">
       <marquee className="welcome-header">🎊 Welcome to the Alumni Events! 🎊</marquee>
      <div className="header">
        <div className="tabs">
          <button 
            className={activeTab === "today" ? "active" : ""}
            onClick={() => setActiveTab("today")}
          >
            🎉 Today's Events
          </button>
          <button 
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
            
          >
            🚀 Upcoming Events
          </button>
          <button 
            className={activeTab === "past" ? "active" : ""}
            onClick={() => setActiveTab("past")}
          >
            ⏳ Past Events
          </button>
        </div>
        <button className="add-event-btn" onClick={() => setShowAddForm(true)}>➕ Add Event</button>
      </div>

      {showAddForm && (
        <div className="add-event-form">
          <h2>➕ Add New Event</h2>
          <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
          <input type="text" placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
          <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          <button onClick={handleAddEvent}>Add Event</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}

      {activeTab === "today" && (
        <div className="events-list">
          {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p><strong>📅 Date:</strong> {event.date}</p>
                <p><strong>⏰ Time:</strong> {event.time}</p>
                <p><strong>📍 Venue:</strong> {event.venue}</p>
                <p>{event.description}</p>
                <button onClick={() => handleEditClick(event)}>Edit</button>
              </div>
            ))
          ) : (
            <p>No events today.</p>
          )}
        </div>
      )}

      {activeTab === "upcoming" && (
        <div className="events-list">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>📅 Date:</strong> {event.date}</p>
              <p><strong>⏰ Time:</strong> {event.time}</p>
              <p><strong>📍 Venue:</strong> {event.venue}</p>
              <p>{event.description}</p>
              <button onClick={() => handleEditClick(event)}>Edit</button>
            </div>
          ))}
        </div>
      )}
      {activeTab === "past" && (
  <div className="events-list">
    {pastEvents.length > 0 ? (
      pastEvents.map((event) => (
        <div key={event.id} className="event-card">
          <h3>{event.title}</h3>
          <p><strong>📅 Date:</strong> {event.date}</p>
          <p><strong>⏰ Time:</strong> {event.time}</p>
          <p><strong>📍 Venue:</strong> {event.venue}</p>
          <p>{event.description}</p>
        </div>
      ))
    ) : (
      <p>No past events available.</p>
    )}
  </div>
)}

      {editEvent && (
        <div className="edit-event-form">
          <h2>Edit Event</h2>
          <input type="text" value={editEvent.title} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} />
          <input type="date" value={editEvent.date} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} />
          <input type="time" value={editEvent.time} onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })} />
          <input type="text" value={editEvent.venue} onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })} />
          <textarea value={editEvent.description} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Events;