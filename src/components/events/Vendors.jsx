import React, { useEffect, useMemo, useState } from "react";
import { Trash2, ArrowUpRight } from "lucide-react";
import { useVendors } from "../../hooks/useVendor";

const CATEGORY_LABELS = {
  catering: "Catering",
  venue: "Venue",
  photography: "Photography",
  decoration: "Decoration",
  others: "Others",
};

export default function Vendors({ eventId }) {
  const { vendors, loading, error, fetchVendors, addVendor, deleteVendor } =
    useVendors();

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
    imageUrl: "",
    websiteUrl: "",
  });

  useEffect(() => {
    if (eventId) fetchVendors(eventId);
  }, [eventId]);

  useEffect(() => {
    localStorage.setItem("selectedVendors", JSON.stringify(selectedVendors));
  }, [selectedVendors]);

  const groupedVendors = useMemo(() => {
    return vendors.reduce((acc, vendor) => {
      const cat = vendor.category || "others";
      acc[cat] = acc[cat] || [];
      acc[cat].push(vendor);
      return acc;
    }, {});
  }, [vendors]);

  const handleSelect = (id) => {
    setSelectedVendors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddVendor = async () => {
    if (!newVendor.name || !newVendor.estimate) return;

    await addVendor(
      eventId,
      newVendor.name,
      newVendor.email,
      newVendor.phoneNo,
      Number(newVendor.estimate),
      newVendor.category,
      newVendor.details,
      newVendor.imageUrl,
      newVendor.websiteUrl
    );

    setNewVendor({
      name: "",
      email: "",
      phoneNo: "",
      estimate: "",
      category: "catering",
      details: "",
      imageUrl: "",
      websiteUrl: "",
    });
  };

  if (loading) return <div>Loading vendors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <h3 className="text-3xl font-bold mb-6">Vendor Management</h3>

      {/* ADD VENDOR */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 grid gap-4 md:grid-cols-2">
        {[
          ["Name", "name"],
          ["Email", "email"],
          ["Phone", "phoneNo"],
          ["Estimate", "estimate"],
          ["Image URL", "imageUrl"],
          ["Website URL", "websiteUrl"],
        ].map(([label, key]) => (
          <input
            key={key}
            placeholder={label}
            className="border p-2 rounded"
            value={newVendor[key]}
            onChange={(e) =>
              setNewVendor({ ...newVendor, [key]: e.target.value })
            }
          />
        ))}

        <select
          className="border p-2 rounded"
          value={newVendor.category}
          onChange={(e) =>
            setNewVendor({ ...newVendor, category: e.target.value })
          }
        >
          {Object.keys(CATEGORY_LABELS).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          className="border p-2 rounded md:col-span-2"
          value={newVendor.details}
          onChange={(e) =>
            setNewVendor({ ...newVendor, details: e.target.value })
          }
        />

        <button
          onClick={handleAddVendor}
          className="bg-brown text-white px-4 py-2 rounded"
        >
          Add Vendor
        </button>
      </div>

      {/* VENDOR CARDS */}
      {Object.entries(groupedVendors).map(([category, list]) => (
        <div key={category} className="mb-12">
          <h4 className="text-2xl font-semibold mb-4">
            {CATEGORY_LABELS[category]}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((vendor) => {
              const selected = selectedVendors.includes(vendor._id);

              return (
                <div
                  key={vendor._id}
                  onClick={() => handleSelect(vendor._id)}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition border
                  ${
                    selected
                      ? "border-brown bg-brown text-white"
                      : "bg-white"
                  }`}
                >
                  {vendor.imageUrl && (
                    <img
                      src={vendor.imageUrl|| "/bg2.jpg"}
                      alt={vendor.name}
                      className="h-45 w-full object-cover"
                    />
                  )}

                  <div className="p-5 space-y-2">
                    <h5 className="text-xl font-bold">{vendor.name}</h5>

                    <p className="text-sm opacity-80">
                      {vendor.details || "No description provided"}
                    </p>

                    <p className="text-sm">📞 {vendor.phoneNo || "N/A"}</p>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xl font-bold">
                        ₹{vendor.estimate}
                      </span>

                      {vendor.websiteUrl && (
                        <a
                          href={vendor.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          Open Website <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVendor(vendor._id);
                        setSelectedVendors((prev) =>
                          prev.filter((id) => id !== vendor._id)
                        );
                      }}
                      className="flex items-center gap-2 text-red-600 text-sm mt-3"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
