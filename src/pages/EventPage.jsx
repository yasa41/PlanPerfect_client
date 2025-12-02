import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import GuestList from "../components/events/GuestList.jsx";
import Vendors from "../components/events/Vendors.jsx";
import ToDoList from "../components/events/ToDoList.jsx";
import Budget from "../components/events/Budget.jsx";
import Invites from "../components/events/Invites.jsx";
import { useEvents } from "../hooks/useEvent";

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
      {/* Navbar / Top Bar */}
      <nav className="w-full bg-white shadow flex items-center justify-between px-8 py-5">
        <button
          onClick={() => navigate("/your-events")}
          className="flex items-center text-brown font-semibold hover:underline"
        >
          <span className="mr-2">&larr;</span>Back to Events
        </button>
        <div className="text-2xl font-extrabold text-gold font-sans tracking-wide text-center">
          PlanPerfect
        </div>
        {/* Right side: empty, for spacing/balance */}
        <div style={{ width: "120px" }} />
      </nav>
      
      {/* Banner & Event Info */}
      <div className="max-w-7xl mx-auto px-8 pt-12 relative">
        <div className="overflow-hidden rounded-[40px] shadow-lg h-[320px]">
          <img
            src={(eventType?.image && "http://localhost:5000" + eventType.image) || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"}
            alt={`${title} Banner`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white rounded-[32px] shadow-lg px-12 py-8 mt-[-64px] relative flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold text-brown mb-4">{title}</h2>
            <p className="text-taupe mb-4">{description}</p>
            <div className="flex space-x-8 text-taupe">
              <div className="flex items-center space-x-2 text-lg">
                <FaRegCalendarAlt className="text-gold" />
                <span className="font-semibold">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-lg">
                <FaMapMarkerAlt className="text-gold" />
                <span className="font-semibold">{venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-14 px-8">
        <div className="flex items-center border-b py-3 space-x-10 text-taupe font-semibold text-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 ${activeTab === tab ? "border-b-4 border-gold text-brown" : "hover:text-brown"} transition font-sans`}
              style={{ minWidth: 120 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto bg-white rounded-[32px] shadow-2xl mt-6 mb-12 p-10 overflow-x-auto transition min-h-[320px]">
       {activeTab === "Guest List" && <GuestList eventId={eventId} />}

        {activeTab === "Vendors" && <Vendors eventId={eventId} />}
        {activeTab === "ToDo List" && <ToDoList eventId={eventId} />}
        {activeTab === "Budget" && <Budget eventId={eventId} />}
        {activeTab === "Invites" && <Invites eventId={eventId} />}
      </div>
    </div>
  );
}
