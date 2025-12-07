import React, { useEffect } from "react";
import { useEvents } from "../../hooks/useEvent";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

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
      {/* NAVBAR */}
      <nav className="
        flex flex-col sm:flex-row items-center justify-between 
        px-4 sm:px-6 md:px-10 lg:px-20 
        py-4 md:py-6 
        bg-offwhite shadow gap-3 sm:gap-0
      ">
        <div className="text-2xl sm:text-3xl font-extrabold text-gold font-sans">
          PlanPerfect
        </div>

        {/* Desktop nav */}
        <div className="
          hidden sm:flex gap-4 md:gap-8 
          text-taupe font-medium text-sm md:text-lg
        ">
          <button
            className="hover:text-brown"
            onClick={() => navigate("/your-events")}
          >
            Your Events
          </button>

          <button
            className="hover:text-brown"
            onClick={handleCreateEvent}
          >
            Create Event
          </button>
        </div>

        <button
          className="
            bg-brown px-3 sm:px-4 md:px-5 py-2 
            rounded-lg text-offwhite 
            text-sm md:text-base font-semibold 
            hover:bg-gold hover:text-brown
          "
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {/* MAIN */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 md:pt-8 flex-1">
        <div className="
          flex flex-col sm:flex-row sm:items-center sm:justify-between 
          gap-3 mb-6 md:mb-8
        ">
          <h1 className="text-2xl md:text-3xl font-bold text-brown">
            Your Events
          </h1>

          {/* MOBILE NAV BUTTONS */}
          <div className="flex sm:hidden gap-3">
            <button
              className="px-3 py-2 rounded-md border border-taupe text-sm text-taupe"
              onClick={() => navigate("/your-events")}
            >
              Your Events
            </button>

            <button
              className="px-3 py-2 rounded-md bg-brown text-offwhite text-sm"
              onClick={handleCreateEvent}
            >
              Create Event
            </button>
          </div>
        </div>

        {/* LOADING / ERRORS */}
        {loading && <div>Loading events...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* EVENT GRID */}
        <div className="
          grid 
          grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
          gap-6 sm:gap-6 md:gap-8
        ">
          {workingEvents.map((ev) => (
            <div
              key={ev._id}
              className="
                relative rounded-2xl overflow-hidden shadow-lg cursor-pointer 
                h-64 sm:h-72 lg:h-80 transition hover:scale-[1.01]
              "
              onClick={() => handleCardClick(ev._id)}
            >
              {/* IMAGE */}
              <img
                src={
                  ev.eventType?.image
                    ? `${BACKEND_BASE_URL}${ev.eventType.image}`
                    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                }
                alt={ev.title}
                className="w-full h-full object-cover"
              />

              {/* TITLE */}
              <span
                className="
                  absolute bottom-3 sm:bottom-4 right-4 sm:right-6 
                  px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg 
                  font-bold text-base sm:text-lg 
                  bg-brown/80 text-offwhite
                "
                style={{
                  letterSpacing: "0.03em",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 2px 8px rgba(70, 46, 23, 0.15)",
                }}
              >
                {ev.title}
              </span>

              {/* DATE + VENUE */}
              <div className="
                absolute top-3 sm:top-4 left-4 
                bg-white/80 backdrop-blur-sm 
                rounded px-2.5 sm:px-3 py-1.5 
                text-[11px] sm:text-xs md:text-sm 
                text-taupe shadow
              ">
                <div>Date: {ev.date}</div>
                <div>Venue: {ev.venue}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-10 md:h-16" />
      </main>

      {/* FOOTER */}
      <footer className="
        w-full bg-brown text-offwhite 
        py-4 md:py-6 mt-8 md:mt-10 
        text-center text-sm md:text-lg font-sans
      ">
        © {new Date().getFullYear()} PlanPerfect. All rights reserved.
      </footer>
    </div>
  );
}
