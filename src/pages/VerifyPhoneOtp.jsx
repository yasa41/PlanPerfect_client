import React from "react";
import bgImage from "/bg4.avif";
import { FaLock } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useVerifyPhoneOtp } from "../hooks/useVerifyPhoneOtp";

export default function VerifyPhoneOtp() {
  const { state } = useLocation();
  const phone = state?.phone;

  const { otp, setOtp, error, handleSubmit } = useVerifyPhoneOtp(phone);

  if (!phone) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-offwhite rounded-[28px] shadow-2xl p-8 w-[420px]">
        <div className="flex justify-center mb-4">
          <FaLock className="text-gold text-3xl" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 text-brown">
          Enter OTP
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="6-digit OTP"
            className="w-full p-4 mb-4 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button className="w-full bg-brown text-white py-3 rounded">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
