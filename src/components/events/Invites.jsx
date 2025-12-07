import React, { useState } from "react";
import { useInvite } from "../../hooks/useInvite";

const InviteManager = ({ eventId }) => {
  const { loading, error, resetError, generateText, sendEmails } = useInvite();

  const [inviteText, setInviteText] = useState("");
  const [subject, setSubject] = useState("You're invited!");
  const [inviteHtml, setInviteHtml] = useState("");

  const handleGenerateText = async () => {
    try {
      resetError();
      const text = await generateText(eventId);
      setInviteText(text);
      setInviteHtml(
        `<div style="font-family: Arial, sans-serif; line-height: 1.6;">${text.replace(
          /\n/g,
          "<br>"
        )}</div>`
      );
    } catch {}
  };

  const handleSendEmails = async () => {
    try {
      await sendEmails(eventId, subject, inviteHtml);
      alert("Invite emails sent successfully!");
    } catch {}
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl sm:text-3xl font-bold text-brown mb-4">
        Invite Manager
      </h3>

      {/* Loading + Error */}
      {loading && <div className="text-brown mb-4">Loading...</div>}
      {error && (
        <div
          className="text-red-600 mb-4 px-4 py-2 bg-offwhite rounded-lg cursor-pointer hover:bg-gold/20 transition text-sm sm:text-base"
          onClick={resetError}
        >
          {error}
        </div>
      )}

      {/* Generate Text Button */}
      <div className="mb-6">
        <button
          onClick={handleGenerateText}
          disabled={loading}
          className="
            bg-gold text-brown 
            px-6 sm:px-8 py-3 
            rounded-lg font-bold 
            hover:bg-brown hover:text-offwhite 
            transition text-base sm:text-lg
            w-full sm:w-auto
          "
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
            className="
              border bg-offwhite rounded-lg 
              px-4 sm:px-6 py-6 
              text-brown text-sm sm:text-md 
              leading-relaxed min-h-[200px] 
              hover:border-gold/50 transition
              whitespace-pre-wrap
            "
          >
            {inviteText}
          </div>
        </div>
      )}

      {/* Subject + Send */}
      {inviteText && (
        <div
          className="
            flex flex-col sm:flex-row 
            gap-4 sm:gap-6 
            items-start sm:items-end 
            mb-8
          "
        >
          {/* Subject Input */}
          <div className="flex-1 w-full">
            <label className="font-semibold text-lg text-brown block mb-2">
              Email Subject:
            </label>
            <input
              type="text"
              className="
                border bg-offwhite rounded-lg 
                px-4 py-3 w-full 
                text-base sm:text-lg
              "
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          {/* Send Button */}
          <div className="flex w-full sm:w-auto">
            <button
              onClick={handleSendEmails}
              disabled={loading}
              className="
                bg-gold text-brown 
                px-6 sm:px-8 py-3 
                rounded-lg font-bold 
                hover:bg-brown hover:text-offwhite 
                transition 
                text-sm sm:text-md 
                w-full sm:w-auto
                whitespace-nowrap
              "
            >
              Send Invites
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      {inviteText && (
        <div
          className="
            px-4 sm:px-6 py-3 
            text-gold bg-offwhite 
            rounded-lg font-semibold 
            text-base sm:text-lg mb-6
          "
        >
          Ready to send {loading ? "..." : "invites to all guests!"}
        </div>
      )}
    </div>
  );
};

export default InviteManager;
