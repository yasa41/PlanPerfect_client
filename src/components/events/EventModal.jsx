import React, { useState } from "react";
import { useEvents } from "../../hooks/useEvent";

export default function EventModal({ eventType, onClose, onEventCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // NEW: separate date and time
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const [venue, setVenue] = useState("");
  const { createNewEvent, loading, error } = useEvents();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || !eventTime) {
      alert("Please select both date and time.");
      return;
    }

    // Combine into valid datetime string
    const combinedDate = `${eventDate}T${eventTime}`;

    const payload = {
      title,
      description,
      date: combinedDate, // <-- ONLY THIS CHANGED
      venue,
      eventType: eventType.name // DO NOT TOUCH THIS
    };

    const res = await createNewEvent(payload);
    if (res && res.success) onEventCreated();
  };

  return (
    <div
      className="
        fixed inset-0 
        bg-black bg-opacity-30 
        flex items-center justify-center 
        z-50 px-4
      "
    >
      <form
        className="
          bg-white p-6 sm:p-8 
          rounded-lg shadow-lg 
          w-full max-w-sm sm:max-w-md 
        "
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-brown text-center sm:text-left">
          Create {eventType.name} Event
        </h2>

        {/* Title */}
        <input
          className="
            mb-4 w-full border px-3 py-2 sm:px-4 sm:py-2 
            rounded text-sm sm:text-base
          "
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <input
          className="
            mb-4 w-full border px-3 py-2 sm:px-4 sm:py-2 
            rounded text-sm sm:text-base
          "
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* EVENT DATE (Calendar Picker) */}
        <input
          type="date"
          className="
            mb-4 w-full border px-3 py-2 sm:px-4 sm:py-2 
            rounded text-sm sm:text-base
          "
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />

        {/* EVENT TIME */}
        <input
          type="time"
          className="
            mb-4 w-full border px-3 py-2 sm:px-4 sm:py-2 
            rounded text-sm sm:text-base
          "
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
        />

        {/* Venue */}
        <input
          className="
            mb-4 w-full border px-3 py-2 sm:px-4 sm:py-2 
            rounded text-sm sm:text-base
          "
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
          <button
            type="submit"
            className="
              bg-gold text-brown font-semibold 
              px-6 py-2 rounded 
              hover:bg-brown hover:text-offwhite 
              transition text-sm sm:text-base
            "
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

          <button
            type="button"
            className="
              bg-gray-200 px-4 py-2 
              rounded text-sm sm:text-base
            "
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
