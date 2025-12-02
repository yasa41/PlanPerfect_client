// src/hooks/useGuests.js
import { useState } from "react";
import {
  fetchGuestsByEvent,
  addGuest,
  updateRsvp,
  rsvpViaLink,
} from "../services/api";

export function useGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all guests for an event
  const fetchGuests = async (eventId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchGuestsByEvent(eventId);
      if (res.data.success) setGuests(res.data.guests);
      else setError(res.data.message || "Failed to fetch guests");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching guests");
    }
    setLoading(false);
  };

  // Add a guest
  const addNewGuest = async (eventId, guestData) => {
    setLoading(true);
    setError("");
    try {
      const res = await addGuest(eventId, guestData);
      if (res.data.success) {
        setGuests((prev) => [...prev, res.data.guest]);
      } else setError(res.data.message || "Failed to add guest");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding guest");
    }
    setLoading(false);
  };

  // Update RSVP
  const updateGuestRsvp = async (guestId, rsvpStatus) => {
    setLoading(true);
    setError("");
    try {
      const res = await updateRsvp(guestId, rsvpStatus);
      if (res.data.success) {
        setGuests((prev) =>
          prev.map((g) =>
            g._id === guestId ? { ...g, rsvpStatus: rsvpStatus } : g
          )
        );
      } else setError(res.data.message || "Failed to update RSVP");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating RSVP");
    }
    setLoading(false);
  };

  return {
    guests,
    loading,
    error,
    fetchGuests,
    addNewGuest,
    updateGuestRsvp,
    rsvpViaLink,
  };
}
