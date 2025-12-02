import React, { useState } from "react";
import { useInvite } from "../../hooks/useInvite";

const InviteManager = ({ eventId }) => {
  const {
    loading,
    error,
    resetError,
    generateText,
    sendEmails,
  } = useInvite();

  const [inviteText, setInviteText] = useState("");
  const [subject, setSubject] = useState("You're invited!");
  const [inviteHtml, setInviteHtml] = useState("");

  const handleGenerateText = async () => {
    try {
      resetError();
      const text = await generateText(eventId);
      setInviteText(text);
      setInviteHtml(
        `<div style="font-family: Arial, sans-serif; line-height: 1.6;">${text.replace(/\n/g, "<br>")}</div>`
      );
    } catch {
      // error handled by hook
    }
  };

  const handleSendEmails = async () => {
    try {
      await sendEmails(eventId, subject, inviteHtml);
      alert("Invite emails sent successfully!");
    } catch {
      // error handled by hook
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-brown mb-4">Invite Manager</h3>

      {loading && <div className="text-brown mb-4">Loading...</div>}
      {error && (
        <div
          className="text-red-600 mb-4 px-4 py-2 bg-offwhite rounded-lg cursor-pointer hover:bg-gold/20 transition"
          onClick={resetError}
          title="Click to clear error"
        >
          {error}
        </div>
      )}

      {/* Generate Invite Text */}
      <div className="mb-6">
        <button
          onClick={handleGenerateText}
          disabled={loading}
          className="bg-gold text-brown px-8 py-3 rounded-lg font-bold hover:bg-brown hover:text-offwhite transition text-lg"
        >
          {loading ? "Generating..." : "Generate Invite Text"}
        </button>
      </div>

      {/* Invite Preview */}
      {inviteText && (
        <div className="mb-8">
          <label className="font-semibold text-lg text-brown block mb-3">
            Invite Preview:
          </label>
          <div
            className="border bg-offwhite rounded-lg px-6 py-6 text-brown text-md leading-relaxed min-h-[200px] hover:border-gold/50 transition"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {inviteText}
          </div>
        </div>
      )}

      {/* Email Subject & Send Button */}
      {inviteText && (
        <div className="flex gap-6 items-end mb-8">
          {/* Subject Input */}
          <div className="flex-1">
            <label className="font-semibold text-lg text-brown block mb-2">
              Email Subject:
            </label>
            <input
              type="text"
              className="border bg-offwhite rounded-lg px-4 py-3 w-full text-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          {/* Only Send Button (Download removed) */}
          <div className="flex">
            <button
              onClick={handleSendEmails}
              disabled={loading}
              className="bg-gold text-brown px-6 py-3 rounded-lg font-bold hover:bg-brown hover:text-offwhite transition text-md whitespace-nowrap"
            >
              Send Invites
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      {inviteText && (
        <div className="px-6 py-3 text-gold bg-offwhite rounded-lg font-semibold text-lg mb-6">
          Ready to send {loading ? "..." : "invites to all guests!"}
        </div>
      )}
    </div>
  );
};

export default InviteManager;
