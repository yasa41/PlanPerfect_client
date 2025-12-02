import React, { useState } from "react";

const defaultMsg = 
  "Join us for an evening of innovation and inspiration. We are thrilled to bring together creative minds from around the world to share ideas, foster collaboration, and celebrate the future of design. Enjoy keynote speakers, interactive workshops, and networking opportunities.";

export default function InvitationGenerator() {
  const [eventName, setEventName] = useState("Summer Design Summit");
  const [dateTime, setDateTime] = useState("August 15, 2024 at 6:00 PM");
  const [location, setLocation] = useState("The Grand Hall, 123 Design Lane");
  const [rsvp, setRsvp] = useState("Please RSVP by August 1st");
  const [message, setMessage] = useState(defaultMsg);
  const [includeSchedule, setIncludeSchedule] = useState(false);

  // Use a warm, blurred Unsplash background (change src to your preference)
  const bgImage = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-offwhite min-h-screen flex flex-col lg:flex-row items-start justify-center py-12 px-2 font-sans gap-10">
      {/* Left: Form */}
      <div className="flex-1 max-w-md">
        <h1 className="text-3xl font-extrabold text-brown mb-6">Invitation Generator</h1>
        <h2 className="text-xl font-bold text-brown mb-4">Event Details</h2>
        <div className="mb-4">
          <label className="font-semibold text-taupe mb-1 block">Event Platform</label>
          <input 
            type="text" 
            className="w-full border rounded-lg px-3 py-2 mb-3 bg-offwhite text-brown text-lg" 
            value={eventName} 
            onChange={e => setEventName(e.target.value)} 
          />
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-taupe">Date & Time</label>
              <input
                className="w-full border rounded-lg px-3 py-2 bg-offwhite text-brown text-lg"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-taupe">Location</label>
              <input
                className="w-full border rounded-lg px-3 py-2 bg-offwhite text-brown text-lg"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>
          <label className="block mb-1 font-semibold text-taupe">RSVP Details</label>
          <input
            className="w-full border rounded-lg px-3 py-2 mb-3 bg-offwhite text-brown text-lg"
            value={rsvp}
            onChange={e => setRsvp(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-bold text-brown mb-3">Invitation Message</h2>
        <textarea
          className="w-full border rounded-lg px-3 py-3 h-28 mb-2 bg-offwhite text-brown text-lg"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <span className="font-medium text-taupe">Include event schedule</span>
          <button
            className={`w-10 h-6 rounded-full relative transition ${includeSchedule ? "bg-gold" : "bg-taupe"}`}
            onClick={() => setIncludeSchedule(!includeSchedule)}
            role="switch"
            aria-checked={includeSchedule}
          >
            <span 
              className={`block w-5 h-5 rounded-full absolute top-0 left-0 transition-transform ${includeSchedule ? "translate-x-5 bg-brown" : "bg-offwhite"}`}
            />
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="bg-gold px-5 py-3 rounded-lg font-bold text-brown text-lg flex-1 hover:bg-brown hover:text-offwhite transition" type="button">
            Generate with AI
          </button>
          <button className="bg-brown px-5 py-3 rounded-lg font-semibold text-offwhite text-lg flex-1 hover:bg-gold hover:text-brown transition" type="button">
            Download as PDF
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
        <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl">

          {/* Blurred background */}
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          <div className="absolute inset-0 flex flex-col justify-start items-center px-8 pt-14 pb-6">
            <nav className="w-full flex items-center justify-end gap-6 mb-7">
              <span className="text-offwhite opacity-70 font-medium">Dashboard</span>
              <span className="text-offwhite opacity-70 font-medium">Events</span>
              <span className="text-offwhite opacity-70 font-medium">Contacts</span>
              <button className="bg-gold text-brown rounded px-4 py-1 font-bold">Create Event</button>
            </nav>
            <span className="uppercase tracking-wide text-offwhite text-sm opacity-70 mb-2">You're invited to</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-offwhite mb-5 text-center" style={{ textShadow: "0 2px 8px #0005" }}>
              {eventName}
            </h2>
            <div className="font-bold text-lg text-gold mb-4 text-center">{dateTime}</div>
            <div className="text-offwhite/80 mb-3 text-center">{location}</div>
            <div className="text-offwhite/90 mb-8 text-center leading-relaxed">{message}</div>
            <div className="text-gold font-medium text-center mt-3">{rsvp}</div>
            {includeSchedule && (
              <div className="text-offwhite/80 mt-4 italic text-center">
                <hr className="my-2 border-gold" />
                <div>Event Schedule: 6:00 PM - Arrival & Welcome | 7:00 PM - Keynote | 8:30 PM - Networking</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
