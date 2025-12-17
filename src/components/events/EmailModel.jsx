import { useState } from "react";
import { X, Send } from "lucide-react";

export default function EmailModal({ vendor, onClose, draft }) {
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);

  if (!vendor) return null;

  const handleSend = () => {
    if (!vendor.email) {
      alert("This vendor does not have an email address.");
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:${vendor.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[720px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold mb-6">Email {vendor.name}</h3>

        <label className="text-sm font-medium mb-1 block">Subject</label>
        <input
          className="border p-3 rounded-lg w-full mb-5 focus:outline-none focus:ring-2 focus:ring-brown"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label className="text-sm font-medium mb-1 block">Message</label>
        <textarea
          className="border p-3 rounded-lg w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-brown"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSend}
            className="bg-brown text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Send size={18} />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
