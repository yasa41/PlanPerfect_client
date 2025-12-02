import React, { useEffect, useState } from "react";
import { useGuests } from "../../hooks/useGuest";

const statusColors = {
  accepted: "bg-green-200 text-green-800",
  declined: "bg-red-200 text-red-800",
  pending: "bg-yellow-200 text-yellow-800",
};

const RSVP_OPTIONS = [
  { value: "accepted", label: "Attending" },
  { value: "declined", label: "Declined" },
  { value: "pending", label: "Pending" },
];

export default function GuestList({ eventId }) {
  const {
    guests,
    loading,
    error,
    fetchGuests,
    addNewGuest,
    updateGuestRsvp,
  } = useGuests();

  const [showAdd, setShowAdd] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (eventId) fetchGuests(eventId);
  }, [eventId]);

  // Add guest modal logic
  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!newGuest.name) return;
    await addNewGuest(eventId, { ...newGuest });
    setShowAdd(false);
    setNewGuest({ name: "", email: "", phoneNo: "" });
  };

  // RSVP update logic
  const handleRsvpChange = async (guestId, rsvpStatus) => {
    await updateGuestRsvp(guestId, rsvpStatus);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-brown">Guest Management</h3>
        <div className="flex gap-2">
          <button
            className="bg-gold text-brown font-bold px-6 py-3 rounded-lg text-lg hover:bg-brown hover:text-offwhite transition"
            onClick={() => setShowAdd(true)}
          >
            + Add Guest
          </button>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
            <h4 className="font-semibold mb-4 text-brown">Add Guest</h4>
            <form onSubmit={handleAddGuest} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                required
                className="border rounded px-3 py-2"
                value={newGuest.name}
                onChange={e => setNewGuest(g => ({ ...g, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={newGuest.email}
                onChange={e => setNewGuest(g => ({ ...g, email: e.target.value }))}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border rounded px-3 py-2"
                value={newGuest.phoneNo}
                onChange={e => setNewGuest(g => ({ ...g, phoneNo: e.target.value }))}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="px-4 py-2 bg-gold text-brown rounded font-bold hover:bg-brown hover:text-offwhite">Add</button>
                <button type="button" className="px-4 py-2 bg-taupe text-white rounded" onClick={() => setShowAdd(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading && <div>Loading guests...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <table className="w-full table-auto text-lg">
        <thead>
          <tr className="text-taupe font-semibold text-left bg-offwhite">
            <th className="pb-4">NAME</th>
            <th className="pb-4">STATUS</th>
            <th className="pb-4">EMAIL</th>
            <th className="pb-4">PHONE</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest._id} className="border-t text-brown">
              <td className="py-4">{guest.name}</td>
              <td className="py-4">
                <select
                  value={guest.rsvpStatus || "pending"}
                  onChange={e => handleRsvpChange(guest._id, e.target.value)}
                  className={`px-4 py-2 rounded font-bold ${statusColors[guest.rsvpStatus] || "bg-taupe text-white"}`}
                >
                  {RSVP_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </td>
              <td className="py-4">{guest.email || "-"}</td>
              <td className="py-4">{guest.phoneNo || "-"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
