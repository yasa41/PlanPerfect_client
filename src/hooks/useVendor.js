import { useState } from "react";
import {
  fetchVendorsByEvent,
  addVendorToEvent,
  updateVendorDetails,
  deleteVendorById,
} from "../services/api";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // FETCH VENDORS BY EVENT
  // ==============================
  const fetchVendors = async (eventId) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchVendorsByEvent(eventId);
      if (res.data.success) {
        setVendors(res.data.vendors || []);
      } else {
        setError(res.data.message || "Failed to fetch vendors");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching vendors");
    }

    setLoading(false);
  };

  // ==============================
  // ADD NEW VENDOR (WITH CATEGORY)
  // ==============================
  const addVendor = async (
    eventId,
    name,
    email,
    phoneNo,
    estimate,
    category,
    details
  ) => {
    setLoading(true);
    setError("");

    try {
      const res = await addVendorToEvent(
        eventId,
        name,
        email,
        phoneNo,
        estimate,
        category,
        details
      );

      if (res.data.success) {
        setVendors((prev) => [...prev, res.data.vendor]);
      } else {
        setError(res.data.message || "Failed to add vendor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding vendor");
    }

    setLoading(false);
  };

  // ==============================
  // UPDATE VENDOR (ANY FIELD)
  // ==============================
  const updateVendor = async (vendorId, updates = {}) => {
    setLoading(true);
    setError("");

    try {
      const res = await updateVendorDetails(vendorId, updates);

      if (res.data.success) {
        setVendors((prev) =>
          prev.map((v) =>
            v._id === vendorId ? res.data.vendor : v
          )
        );
      } else {
        setError(res.data.message || "Failed to update vendor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating vendor");
    }

    setLoading(false);
  };

  // ==============================
  // DELETE VENDOR
  // ==============================
  const deleteVendor = async (vendorId) => {
    setLoading(true);
    setError("");

    try {
      const res = await deleteVendorById(vendorId);

      if (res.data.success) {
        setVendors((prev) =>
          prev.filter((v) => v._id !== vendorId)
        );
      } else {
        setError(res.data.message || "Failed to delete vendor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting vendor");
    }

    setLoading(false);
  };

  // ==============================
  // RETURN
  // ==============================
  return {
    vendors,
    loading,
    error,
    fetchVendors,
    addVendor,
    updateVendor,
    deleteVendor,
  };
}
