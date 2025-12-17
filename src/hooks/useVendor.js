import { useState } from "react";
import {
  fetchVendorsByEvent,
  addVendorToEvent,
  updateVendorDetails,
  deleteVendorById,
  sendVendorEmail,
} from "../services/api";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVendors = async (eventId) => {
    setLoading(true);
    try {
      const res = await fetchVendorsByEvent(eventId);
      setVendors(res.data.vendors || []);
    } catch (err) {
      setError("Failed to fetch vendors");
    }
    setLoading(false);
  };

  const addVendor = async (...args) => {
    setLoading(true);
    const res = await addVendorToEvent(...args);
    if (res.data.success) {
      setVendors((prev) => [...prev, res.data.vendor]);
    }
    setLoading(false);
  };

  const updateVendor = async (vendorId, isHired) => {
    const res = await updateVendorDetails(vendorId, isHired);
    if (res.data.success) {
      setVendors((prev) =>
        prev.map((v) =>
          v._id === vendorId ? res.data.vendor : v
        )
      );
    }
  };

  const deleteVendor = async (vendorId) => {
    await deleteVendorById(vendorId);
    setVendors((prev) => prev.filter((v) => v._id !== vendorId));
  };

  const emailVendor = async (vendorId, subject, body) =>
    sendVendorEmail(vendorId, subject, body);

  return {
    vendors,
    loading,
    error,
    fetchVendors,
    addVendor,
    updateVendor,
    deleteVendor,
    emailVendor,
  };
}
