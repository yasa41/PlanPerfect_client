import React, { useEffect } from "react";
import { useEvents } from "../../hooks/useEvent";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const backendBaseURL = "http://localhost:5000";

export default function YourEventsPage() {
  const { workingEvents, fetchWorkingEvents, loading, error } = useEvents();
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkingEvents();
  }, []);

  const handleCreateEvent = () => {
    navigate("/landing");
  };

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="bg-offwhite min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-20 py-6 bg-offwhite shadow">
        <div className="text-3xl font-extrabold text-gold font-sans">PlanPerfect</div>
        <div className="flex gap-10 text-taupe font-medium text-lg">
          <button className="hover:text-brown bg-transparent" onClick={() => navigate("/your-events")}>
            Your Events
          </button>
          <button className="hover:text-brown bg-transparent" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
        <button
          className="bg-brown px-5 py-2 rounded-lg text-offwhite font-semibold hover:bg-gold hover:text-brown"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      <main className="px-20 pt-8 flex-1">
        <h1 className="text-3xl font-bold text-brown mb-8">Your Events</h1>
        {loading && <div>Loading events...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workingEvents.map((ev) => (
            <div
              key={ev._id}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              style={{ minHeight: "240px", height: "300px" }}
              onClick={() => handleCardClick(ev._id)}
            >
              <img
                src={
                  ev.eventType && ev.eventType.image
                    ? backendBaseURL + ev.eventType.image
                    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                }
                alt={ev.title}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute bottom-4 right-6 px-5 py-2 rounded-lg font-bold text-lg bg-brown/80 text-offwhite font-sans"
                style={{
                  letterSpacing: "0.03em",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 2px 8px rgba(70, 46, 23, 0.15)",
                }}
              >
                {ev.title}
              </span>
              <div className="absolute top-6 left-6 bg-white/80 rounded px-3 py-2 text-taupe shadow text-sm font-sans">
                <div>Date: {ev.date}</div>
                <div>Venue: {ev.venue}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: "64px" }} />
      </main>

      <footer className="w-full bg-brown text-offwhite py-6 mt-10 text-center text-lg font-sans">
        © {new Date().getFullYear()} PlanPerfect. All rights reserved.
      </footer>
    </div>
  );
}
