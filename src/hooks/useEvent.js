import { useState } from "react";

import {
  listEvents,
  getEventById,
  getWorkingEvents,
  addWorkingEvent,
  removeWorkingEvent,
  createEvent,   // ⭐ NEW
} from "../services/api";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [workingEvents, setWorkingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createdEvent, setCreatedEvent] = useState(null);  // ⭐ NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==========================
  // List all events
  // ==========================
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listEvents();
      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        setError(response.data.message || "Failed to fetch events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching events");
    }
    setLoading(false);
  };

  // ==========================
  // Get working events
  // ==========================
  const fetchWorkingEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWorkingEvents();
      if (response.data.success) {
        setWorkingEvents(response.data.workingEvents);
      } else {
        setError(response.data.message || "Failed to fetch working events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching working events");
    }
    setLoading(false);
  };

  // ==========================
  // Add to working events
  // ==========================
  const addEventToWorking = async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addWorkingEvent(eventId);
      if (response.data.success) {
        setWorkingEvents(response.data.workingEvents);
      } else {
        setError(response.data.message || "Failed to add working event");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding working event");
    }
    setLoading(false);
  };

  // ==========================
  // Remove from working events
  // ==========================
  const removeEventFromWorking = async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await removeWorkingEvent(eventId);
      if (response.data.success) {
        setWorkingEvents(response.data.workingEvents);
      } else {
        setError(response.data.message || "Failed to remove working event");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error removing working event");
    }
    setLoading(false);
  };

  // ==========================
  // Get event details by ID
  // ==========================
  const fetchEventById = async (eventId) => {
    setLoading(true);
    setError(null);
    setSelectedEvent(null);

    try {
      const response = await getEventById(eventId);
      if (response.data.success) {
        setSelectedEvent(response.data.event);
      } else {
        setError(response.data.message || "Failed to fetch event");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching event");
    }

    setLoading(false);
  };

  // ==========================
  // ⭐ NEW: CREATE EVENT
  // ==========================
  const createNewEvent = async (eventData) => {
    // eventData = { title, description, date, venue, eventType }
    setLoading(true);
    setError(null);
    setCreatedEvent(null);

    try {
      const response = await createEvent(eventData);

      if (response.data.success) {
        setCreatedEvent(response.data); // stores full event object
        return response.data;
      } else {
        setError(response.data.message || "Failed to create event");
        return null;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating event");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    workingEvents,
    selectedEvent,
    createdEvent,
    loading,
    error,

    fetchEvents,
    fetchWorkingEvents,
    addEventToWorking,
    removeEventFromWorking,
    fetchEventById,

    createNewEvent,  // ⭐ expose to frontend
  };
}
