// hooks/useEventTypes.js
import { useState } from "react";
import { fetchAllEventTypes, fetchEventTypeByName } from "../services/api";

export function useEventTypes() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllEventTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllEventTypes();
      if (response.data.success) {
        setEventTypes(response.data.types);
      } else {
        setError(response.data.message || "Unable to fetch event types.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch event types.");
    } finally {
      setLoading(false);
    }
  };

  // Individual event type fetch: returns the result, doesn't update eventTypes state
  const getEventTypeByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchEventTypeByName(name);
      if (response.data.success) {
        return response.data.type;
      } else {
        setError(response.data.message || "Unable to fetch event type.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch event type.");
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { eventTypes, loading, error, getAllEventTypes, getEventTypeByName };
}
