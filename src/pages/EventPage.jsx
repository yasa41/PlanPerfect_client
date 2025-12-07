import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

import GuestList from "../components/events/GuestList.jsx";
import Vendors from "../components/events/Vendors.jsx";
import ToDoList from "../components/events/ToDoList.jsx";
import Budget from "../components/events/Budget.jsx";
import Invites from "../components/events/Invites.jsx";

import { useEvents } from "../hooks/useEvent";

// Load backend URL from .env
const backendBaseURL = import.meta.env.VITE_API_URL;

const tabs = ["Guest List", "Vendors", "ToDo List", "Budget", "Invites"];

export default function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { fetchEventById, selectedEvent, loading, error } = useEvents();
  const [activeTab, setActiveTab] = useState("Guest List");

  useEffect(() => {
    if (eventId) fetchEventById(eventId);
  }, [eventId]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!selectedEvent) return <div>No event found.</div>;

  const {
    title,
    date,
    venue,
    description,
    eventType,
    guestList = [],
    vendors = eventType?.defaultVendors || [],
    todos = eventType?.defaultTasks || [],
    budget = selectedEvent.budget || [],
    invites = eventType?.defaultInvites || [],
  } = selectedEvent;

  return (
    <div className="bg-offwhite min-h-screen w-full font-sans">
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-4 gap-3">
        <button
          onClick={() => navigate("/your-events")}
          className="flex items-center text-brown font-semibold hover:underline"
        >
          <span className="mr-2">&larr;</span>Back to Events
        </button>

        <div className="text-2xl font-extrabold text-gold text-center tracking-wide">
          PlanPerfect
        </div>

        {/* Spacer for alignment */}
        <div className="hidden sm:block" style={{ width: "120px" }}></div>
      </nav>

      {/* BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 relative">
        <div className="overflow-hidden rounded-[30px] shadow-lg h-[220px] sm:h-[280px] md:h-[340px]">
          <img
            src={
              eventType?.image
                ? backendBaseURL + eventType.image
                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }
            alt={`${title} Banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Info Card */}
        <div className="
          bg-white rounded-[28px] shadow-lg 
          px-6 sm:px-10 py-8 
          mt-[-40px] sm:mt-[-60px] 
          relative flex flex-col md:flex-row 
          md:justify-between md:items-center 
          gap-6 md:gap-0
        ">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brown mb-3">{title}</h2>

            <p className="text-taupe mb-4 text-base sm:text-lg">{description}</p>

            <div className="flex flex-col sm:flex-row sm:space-x-8 gap-3 text-taupe mt-2">
              <div className="flex items-center space-x-2 text-lg">
                <FaRegCalendarAlt className="text-gold" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2 text-lg">
                <FaMapMarkerAlt className="text-gold" />
                <span>{venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-8">
        <div className="
          flex items-center border-b py-3 
          overflow-x-auto scrollbar-hide 
          space-x-6 sm:space-x-10 
          text-taupe font-semibold text-lg sm:text-xl
        ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-4 border-gold text-brown"
                  : "hover:text-brown"
              }`}
              style={{ minWidth: 100 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="
        max-w-7xl mx-auto 
        bg-white rounded-[28px] shadow-2xl 
        mt-6 mb-12 p-6 sm:p-10 
        min-h-[280px] sm:min-h-[340px]
      ">
        {activeTab === "Guest List" && <GuestList eventId={eventId} />}

        {activeTab === "Vendors" && <Vendors eventId={eventId} />}

        {activeTab === "ToDo List" && <ToDoList eventId={eventId} />}

        {activeTab === "Budget" && <Budget eventId={eventId} />}

        {activeTab === "Invites" && <Invites eventId={eventId} />}
      </div>
    </div>
  );
}
