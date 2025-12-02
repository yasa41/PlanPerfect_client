import React, { useState } from "react";
import { useEvents } from "../../hooks/useEvent";

export default function EventModal({ eventType, onClose, onEventCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const { createNewEvent, loading, error } = useEvents();

  // ⭐ Correct usage here:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      date,
      venue,
      eventType: eventType.name   // or eventType._id based on your backend
    };
    const res = await createNewEvent(payload); // use createNewEvent!
    if (res && res.success) {
      onEventCreated();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-8 rounded-lg shadow-lg min-w-[330px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-8 text-brown">Create {eventType.name} Event</h2>
        <input className="mb-4 w-full border px-4 py-2 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="mb-4 w-full border px-4 py-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="mb-4 w-full border px-4 py-2 rounded" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input className="mb-4 w-full border px-4 py-2 rounded" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex gap-4 justify-between">
          <button type="submit" className="bg-gold text-brown font-semibold px-6 py-2 rounded hover:bg-brown hover:text-offwhite transition" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
          <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
