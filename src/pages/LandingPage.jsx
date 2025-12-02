import React, { useEffect, useState } from "react";
import { useEventTypes } from "../hooks/useEventType"; // Event type hook
import { useLogout } from "../hooks/useLogout"; // Logout hook
import { useNavigate } from "react-router-dom";
import EventModal from "../components/events/EventModal"; // Modal to create event
const backendBaseURL = "http://localhost:5000";

export default function LandingPage() {
  const { eventTypes, loading, error, getAllEventTypes } = useEventTypes();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEventType, setActiveEventType] = useState(null);

  useEffect(() => {
    getAllEventTypes();
  }, []);

  const handleYourEvents = () => {
    navigate("/your-events"); // This page will fetch working events via hook
  };

  const handleCreateEvent = () => {
    // If you want a separate /create-event page, otherwise just focus on modal
    // navigate("/create-event");
  };

  const handleCardClick = (eventType) => {
    setActiveEventType(eventType);
    setModalOpen(true);
  };

  const handleEventCreated = () => {
    setModalOpen(false);
    navigate("/your-events");
  };

  return (
    <div className="bg-offwhite min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-20 py-6 bg-offwhite shadow">
        <div className="text-3xl font-extrabold text-gold font-sans">PlanPerfect</div>
        <div className="flex gap-10 text-taupe font-medium text-lg">
          <button className="hover:text-brown bg-transparent" onClick={handleYourEvents}>
            Your Events
          </button>
          <button className="hover:text-brown bg-transparent" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
        <button className="bg-brown px-5 py-2 rounded-lg text-offwhite font-semibold hover:bg-gold hover:text-brown" onClick={logout}>
          Logout
        </button>
      </nav>
      <main className="px-20 pt-8 flex-1">
        <h1 className="text-3xl font-bold text-brown mb-8">Event Templates</h1>
        {loading && <div>Loading event types...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((event) => (
            <div
              key={event._id}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              style={{ minHeight: "240px", height: "300px" }}
              onClick={() => handleCardClick(event)}
            >
              <img src={backendBaseURL + event.image} alt={event.name} className="w-full h-full object-cover" />
              <span
                className="absolute bottom-4 right-6 px-5 py-2 rounded-lg font-bold text-lg bg-brown/80 text-offwhite font-sans"
                style={{
                  letterSpacing: "0.03em",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 2px 8px rgba(70, 46, 23, 0.15)",
                }}
              >
                {event.name}
              </span>
            </div>
          ))}
        </div>
        <div style={{ height: "64px" }} />
      </main>
      <footer className="w-full bg-brown text-offwhite py-6 mt-10 text-center text-lg font-sans">
        © {new Date().getFullYear()} PlanPerfect. All rights reserved.
      </footer>
      {modalOpen && (
        <EventModal
          eventType={activeEventType}
          onClose={() => setModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
}
