import React, { useState } from "react";
import { useEvents } from "../../hooks/useEvent";

/**
 * Prevent numbers at the beginning of a string
 */
const blockLeadingNumbers = (value) => {
  return value.replace(/^\d+/, "");
};

export default function EventModal({ eventType, onClose, onEventCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");

  const { createNewEvent, loading, error } = useEvents();

  // TODAY
  const today = new Date().toISOString().split("T")[0];

  // CURRENT TIME
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || !eventTime) {
      alert("Please select both date and time.");
      return;
    }

    const selectedDateTime = new Date(`${eventDate}T${eventTime}`);
    const now = new Date();

    // HARD BLOCK past datetime
    if (selectedDateTime <= now) {
      alert("Event date and time must be in the future.");
      return;
    }

    const payload = {
      title,
      description,
      date: selectedDateTime.toISOString(),
      venue,
      eventType: eventType.name,
    };

    const res = await createNewEvent(payload);
    if (res && res.success) onEventCreated();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <form
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-brown">
          Create {eventType.name} Event
        </h2>

        {/* TITLE */}
        <input
          className="mb-4 w-full border px-3 py-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(blockLeadingNumbers(e.target.value))
          }
          required
        />

        {/* DESCRIPTION */}
        <input
          className="mb-4 w-full border px-3 py-2 rounded"
          placeholder="Description"
           maxLength={100}
          value={description}
          onChange={(e) =>
            setDescription(blockLeadingNumbers(e.target.value))
          }
        />

        {/* DATE */}
        <input
          type="date"
          className="mb-4 w-full border px-3 py-2 rounded"
          value={eventDate}
          min={today}
          onChange={(e) => {
            setEventDate(e.target.value);
            setEventTime("");
          }}
          required
        />

        {/* TIME */}
        <input
          type="time"
          className="mb-4 w-full border px-3 py-2 rounded"
          value={eventTime}
          min={eventDate === today ? getCurrentTime() : undefined}
          onChange={(e) => {
            const selectedTime = e.target.value;

            if (eventDate === today && selectedTime < getCurrentTime()) {
              alert("Please select a future time.");
              return;
            }

            setEventTime(selectedTime);
          }}
          required
        />

        {/* VENUE */}
        <input
          className="mb-4 w-full border px-3 py-2 rounded"
          placeholder="Place / Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex gap-3 justify-between mt-4">
          <button
            type="submit"
            className="bg-gold text-brown font-semibold px-6 py-2 rounded hover:bg-brown hover:text-offwhite transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
