import React, { useEffect, useState } from "react";
import { useVendors } from "../../hooks/useVendor.js";

export default function Vendors({ eventId }) {
  const {
    vendors,
    loading,
    error,
    fetchVendors,
    addVendor,
    deleteVendor,
  } = useVendors();

  const [selectedVendors, setSelectedVendors] = useState(() => {
    const saved = localStorage.getItem("selectedVendors");
    return saved ? JSON.parse(saved) : [];
  });

  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    phoneNo: "",
    estimate: "",
    details: "",
  });

  useEffect(() => {
    if (eventId) fetchVendors(eventId);
  }, [eventId]);

  useEffect(() => {
    localStorage.setItem("selectedVendors", JSON.stringify(selectedVendors));
  }, [selectedVendors]);

  const handleSelect = (id) => {
    setSelectedVendors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddVendor = async () => {
    if (!newVendor.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!newVendor.estimate) {
      alert("Estimate is required");
      return;
    }

    // Convert estimate to number; use 0 if conversion fails
    const estimateNum = Number(newVendor.estimate);
    if (isNaN(estimateNum)) {
      alert("Estimate must be a valid number");
      return;
    }

    try {
      await addVendor(
        eventId,
        newVendor.name,
        newVendor.email,
        newVendor.phoneNo,
        estimateNum,
        newVendor.details
      );
      setNewVendor({
        name: "",
        email: "",
        phoneNo: "",
        estimate: "",
        details: "",
      });
    } catch (error) {
      alert("Failed to add vendor. Please try again.");
    }
  };

  if (loading) return <div>Loading vendors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <h3 className="text-2xl font-bold text-brown mb-6">Vendor Management</h3>

      {/* ADD VENDOR FORM */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-4 text-brown">Add New Vendor</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            className="border rounded p-2"
            value={newVendor.name}
            onChange={(e) =>
              setNewVendor({ ...newVendor, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            className="border rounded p-2"
            value={newVendor.email}
            onChange={(e) =>
              setNewVendor({ ...newVendor, email: e.target.value })
            }
          />
          <input
            placeholder="Phone"
            className="border rounded p-2"
            value={newVendor.phoneNo}
            onChange={(e) =>
              setNewVendor({ ...newVendor, phoneNo: e.target.value })
            }
          />
          <input
            placeholder="Estimate"
            className="border rounded p-2"
            type="number"
            value={newVendor.estimate}
            onChange={(e) =>
              setNewVendor({ ...newVendor, estimate: e.target.value })
            }
          />
          <textarea
            placeholder="Details"
            className="border rounded p-2 col-span-1 md:col-span-2"
            value={newVendor.details}
            onChange={(e) =>
              setNewVendor({ ...newVendor, details: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAddVendor}
          className="mt-4 px-4 py-2 bg-brown text-white rounded-lg"
        >
          Add Vendor
        </button>
      </div>

      {/* VENDOR LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vendors.map((vendor) => {
          const isSelected = selectedVendors.includes(vendor._id);

          return (
            <div
              key={vendor._id}
              className={`rounded-xl p-6 shadow cursor-pointer transition border-2 ${
                isSelected
                  ? "border-brown bg-brown text-white"
                  : "border-transparent bg-offwhite text-brown"
              }`}
              onClick={() => handleSelect(vendor._id)}
            >
              <span className="text-xl font-bold mb-2 block">{vendor.name}</span>
              <span className="block">Email: {vendor.email || "N/A"}</span>
              <span className="block">Phone: {vendor.phoneNo || "N/A"}</span>
              <span className="block">
                Estimate:{" "}
                {vendor.estimate != null ? `₹${vendor.estimate}` : "N/A"}
              </span>
              <span className="block mb-3">
                Details: {vendor.details || "No details provided"}
              </span>

              <button
                className="text-sm text-red-600 font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteVendor(vendor._id);
                  setSelectedVendors((prev) =>
                    prev.filter((id) => id !== vendor._id)
                  );
                }}
              >
                Delete Vendor
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
