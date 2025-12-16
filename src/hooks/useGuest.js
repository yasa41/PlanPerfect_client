import { useState } from "react";
import {
  fetchGuestsByEvent,
  addGuest,
  updateRsvp,
  rsvpViaLink,
  deleteGuest as apiDeleteGuest,
} from "../services/api";

export function useGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------------------------
  // Fetch guests (supports search via ?q)
  // ------------------------------------
  const fetchGuests = async (eventId, searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchGuestsByEvent(eventId, searchTerm);

      if (res.data?.success) {
        setGuests(res.data.guests);
      } else {
        setError(res.data?.message || "Failed to fetch guests");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching guests");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // Add guest
  // ------------------------------------
  const addNewGuest = async (eventId, guestData) => {
    setLoading(true);
    setError("");

    try {
      const res = await addGuest(eventId, guestData);
      if (res.data?.success) {
        setGuests((prev) => [...prev, res.data.guest]);
      } else {
        setError(res.data?.message || "Failed to add guest");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding guest");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // Update RSVP
  // ------------------------------------
  const updateGuestRsvp = async (guestId, rsvpStatus) => {
    setLoading(true);
    setError("");

    try {
      const res = await updateRsvp(guestId, rsvpStatus);
      if (res.data?.success) {
        setGuests((prev) =>
          prev.map((g) =>
            g._id === guestId ? { ...g, rsvpStatus } : g
          )
        );
      } else {
        setError(res.data?.message || "Failed to update RSVP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating RSVP");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // Delete guest
  // ------------------------------------
  const deleteGuest = async (guestId) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiDeleteGuest(guestId);
      if (res.data?.success) {
        setGuests((prev) => prev.filter((g) => g._id !== guestId));
      } else {
        setError(res.data?.message || "Failed to delete guest");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting guest");
    } finally {
      setLoading(false);
    }
  };

  return {
    guests,
    loading,
    error,
    fetchGuests,
    addNewGuest,
    updateGuestRsvp,
    deleteGuest,
    rsvpViaLink,
  };
}
