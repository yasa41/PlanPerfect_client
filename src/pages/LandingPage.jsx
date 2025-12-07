import React, { useEffect, useState } from "react";
import { useEventTypes } from "../hooks/useEventType";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import EventModal from "../components/events/EventModal";

// Load backend URL from Vite environment
const backendBaseURL = import.meta.env.VITE_API_URL;

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
    navigate("/your-events");
  };

  const handleCreateEvent = () => {
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
      <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-6 sm:px-10 lg:px-20 py-6 bg-offwhite shadow">
        <div className="text-2xl sm:text-3xl font-extrabold text-gold font-sans">
          PlanPerfect
        </div>

        <div className="flex gap-6 sm:gap-10 text-taupe font-medium text-lg">
          <button className="hover:text-brown" onClick={handleYourEvents}>
            Your Events
          </button>
          <button className="hover:text-brown" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>

        <button
          className="bg-brown px-4 sm:px-5 py-2 rounded-lg text-offwhite font-semibold hover:bg-gold hover:text-brown whitespace-nowrap"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {/* Main Section */}
      <main className="px-6 sm:px-10 lg:px-20 pt-8 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-brown mb-8">
          Event Templates
        </h1>

        {loading && <div>Loading event types...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((event) => (
            <div
              key={event._id}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              style={{ minHeight: "220px", height: "280px" }}
              onClick={() => handleCardClick(event)}
            >
              <img
                src={backendBaseURL + event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />

              <span
                className="absolute bottom-4 right-4 px-4 py-2 rounded-lg font-bold text-lg bg-brown/80 text-offwhite font-sans"
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

        <div className="h-16" />
      </main>

      {/* Footer */}
      <footer className="w-full bg-brown text-offwhite py-6 mt-10 text-center text-base sm:text-lg font-sans">
        © {new Date().getFullYear()} PlanPerfect. All rights reserved.
      </footer>

      {/* Modal */}
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
