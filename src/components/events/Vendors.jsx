import React, { useEffect, useState, useMemo } from "react";
import { useVendors } from "../../hooks/useVendor.js";

const CATEGORY_LABELS = {
  catering: "catering",
  venue: "venue",
  photography: "photography",
  decoration: "decoration",
  others: "others",
};

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
    category: "catering",
    details: "",
  });

  /* ===================== FETCH ===================== */
  useEffect(() => {
    if (eventId) fetchVendors(eventId);
  }, [eventId]);

  useEffect(() => {
    localStorage.setItem("selectedVendors", JSON.stringify(selectedVendors));
  }, [selectedVendors]);

  /* ===================== GROUP BY CATEGORY ===================== */
  const groupedVendors = useMemo(() => {
    return vendors.reduce((acc, vendor) => {
      const category = vendor.category || "others";
      if (!acc[category]) acc[category] = [];
      acc[category].push(vendor);
      return acc;
    }, {});
  }, [vendors]);

  /* ===================== HANDLERS ===================== */
  const handleSelect = (id) => {
    setSelectedVendors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddVendor = async () => {
    if (!newVendor.name.trim()) return alert("Name is required");
    if (!newVendor.estimate) return alert("Estimate is required");

    const estimateNum = Number(newVendor.estimate);
    if (isNaN(estimateNum)) return alert("Estimate must be a number");

    try {
      await addVendor(
        eventId,
        newVendor.name,
        newVendor.email,
        newVendor.phoneNo,
        estimateNum,
        newVendor.category,
        newVendor.details
      );

      setNewVendor({
        name: "",
        email: "",
        phoneNo: "",
        estimate: "",
        category: "catering",
        details: "",
      });
    } catch {
      alert("Failed to add vendor");
    }
  };

  /* ===================== UI ===================== */
  if (loading) return <div>Loading vendors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <h3 className="text-2xl sm:text-3xl font-bold text-brown mb-6">
        Vendor Management
      </h3>

      {/* ================= ADD VENDOR ================= */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-4 text-brown">
          Add New Vendor
        </h4>

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
            type="number"
            className="border rounded p-2"
            value={newVendor.estimate}
            onChange={(e) =>
              setNewVendor({ ...newVendor, estimate: e.target.value })
            }
          />

          {/* CATEGORY SELECT */}
          <select
            className="border rounded p-2"
            value={newVendor.category}
            onChange={(e) =>
              setNewVendor({ ...newVendor, category: e.target.value })
            }
          >
            <option value="catering">Catering</option>
            <option value="venue">Venue</option>
            <option value="photography">Photography</option>
            <option value="decoration">Decoration</option>
            <option value="others">Others</option>
          </select>

          <textarea
            placeholder="Additional details"
            className="border rounded p-2 md:col-span-2"
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

      {/* ================= GROUPED VENDORS ================= */}
      {Object.entries(groupedVendors).map(([category, vendorList]) => (
        <div key={category} className="mb-10">
          <h4 className="text-xl sm:text-2xl font-bold text-brown mb-4">
            {CATEGORY_LABELS[category] || "Others"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendorList.map((vendor) => {
              const isSelected = selectedVendors.includes(vendor._id);

              return (
                <div
                  key={vendor._id}
                  className={`
                    rounded-xl p-4 sm:p-6 shadow cursor-pointer transition border-2
                    ${
                      isSelected
                        ? "border-brown bg-brown text-white"
                        : "border-transparent bg-offwhite text-brown"
                    }
                  `}
                  onClick={() => handleSelect(vendor._id)}
                >
                  <span className="text-lg sm:text-xl font-bold block mb-2">
                    {vendor.name}
                  </span>

                  <span className="block">
                    Phone: {vendor.phoneNo || "N/A"}
                  </span>

                  <span className="block">
                    Estimate: ₹{vendor.estimate}
                  </span>

                  <button
                    className="text-sm text-red-600 font-semibold mt-3"
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
        </div>
      ))}
    </>
  );
}
