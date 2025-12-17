import React, { useEffect, useState } from "react";
import { Plus, Trash2, Download, Search } from "lucide-react";
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
    deleteGuest,
  } = useGuests();

  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (eventId) fetchGuests(eventId);
  }, [eventId]);

  const handleAddGuest = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z ]+$/.test(newGuest.name)) {
      alert("Name must contain only letters and spaces.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(newGuest.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (newGuest.phoneNo.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    await addNewGuest(eventId, newGuest);
    setShowAdd(false);
    setNewGuest({ name: "", email: "", phoneNo: "" });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchGuests(eventId, value);
  };

  const handleDeleteGuest = async (guestId) => {
    if (window.confirm("Delete this guest?")) {
      await deleteGuest(guestId);
    }
  };

  const exportToCsv = () => {
    if (!guests.length) return alert("No guests to export");

    const escapeCSV = (v) =>
      `"${String(v ?? "").replace(/"/g, '""')}"`;

    const csv = [
      ["Name", "Email", "Phone", "RSVP Status"],
      ...guests.map((g) => [
        escapeCSV(g.name),
        escapeCSV(g.email),
        escapeCSV(g.phoneNo),
        escapeCSV(g.rsvpStatus),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `guests_${eventId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h3 className="text-3xl font-bold text-brown">Guest Management</h3>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-taupe"
            />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-taupe/40 bg-offwhite focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>

          {/* Export */}
          <button
            onClick={exportToCsv}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gold/40 text-brown font-semibold hover:bg-gold/20 transition w-full sm:w-auto"
          >
            <Download size={18} />
            Export
          </button>

          {/* Add */}
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gold text-brown font-bold hover:bg-brown hover:text-offwhite transition w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Guest
          </button>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h4 className="text-xl font-bold text-brown mb-4">Add Guest</h4>

            <form onSubmit={handleAddGuest} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                required
                value={newGuest.name}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    name: e.target.value.replace(/[^A-Za-z ]/g, ""),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={newGuest.email}
                onChange={(e) =>
                  setNewGuest({ ...newGuest, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                type="tel"
                placeholder="Phone (10 digits)"
                maxLength={10}
                required
                value={newGuest.phoneNo}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    phoneNo: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 bg-taupe text-white rounded-lg w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gold text-brown font-bold hover:bg-brown hover:text-offwhite transition w-full sm:w-auto"
                >
                  Add Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading / Error */}
      {loading && <p>Loading guests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm sm:text-base min-w-[600px]">
          <thead>
            <tr className="text-taupe bg-offwhite">
              <th className="px-3 py-3 text-left">Name</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Email</th>
              <th className="px-3 py-3 text-left">Phone</th>
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && guests.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-taupe">
                  No guests found
                </td>
              </tr>
            )}

            {guests.map((guest) => (
              <tr key={guest._id} className="border-t">
                <td className="px-3 py-4">{guest.name}</td>

                <td className="px-3 py-4">
                  <select
                    value={guest.rsvpStatus}
                    onChange={(e) =>
                      updateGuestRsvp(guest._id, e.target.value)
                    }
                    className={`px-3 py-2 rounded-lg font-semibold ${statusColors[guest.rsvpStatus]}`}
                  >
                    {RSVP_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-3 py-4">{guest.email}</td>
                <td className="px-3 py-4">{guest.phoneNo}</td>

                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => handleDeleteGuest(guest._id)}
                    className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-100 transition"
                    title="Delete guest"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
