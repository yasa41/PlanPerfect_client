import { useState } from "react";
import {
  fetchVendorsByEvent,
  addVendorToEvent,
  updateVendorDetails,
  deleteVendorById,
} from "../services/api"; // adjust path as needed

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch vendors for an event
  const fetchVendors = async (eventId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchVendorsByEvent(eventId);
      if (res.data.success) setVendors(res.data.vendors || []);
      else setError(res.data.message || "Failed to fetch vendors");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching vendors");
    }
    setLoading(false);
  };

  // Add new vendor
  const addVendor = async (eventId, name, email, phoneNo, estimate, details) => {
    setLoading(true);
    setError("");
    try {
      const res = await addVendorToEvent(eventId, name, email, phoneNo, estimate, details);
      if (res.data.success) setVendors((prev) => [...prev, res.data.vendor]);
      else setError(res.data.message || "Failed to add vendor");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding vendor");
    }
    setLoading(false);
  };

  // Update vendor details
  const updateVendor = async (vendorId, updates) => {
    setLoading(true);
    setError("");
    try {
      const res = await updateVendorDetails(vendorId, updates);
      if (res.data.success) {
        setVendors((prev) =>
          prev.map((v) => (v._id === vendorId ? res.data.vendor : v))
        );
      } else {
        setError(res.data.message || "Failed to update vendor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating vendor");
    }
    setLoading(false);
  };

  // Delete vendor
  const deleteVendor = async (vendorId) => {
    setLoading(true);
    setError("");
    try {
      const res = await deleteVendorById(vendorId);
      if (res.data.success) {
        setVendors((prev) => prev.filter((v) => v._id !== vendorId));
      } else {
        setError(res.data.message || "Failed to delete vendor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting vendor");
    }
    setLoading(false);
  };

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
