import React from "react";
import bgImage from "/bg4.avif";
import { FaKey } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useResetPasswordByPhone } from "../hooks/useResetPasswordByPhone";

export default function ResetPasswordPhone() {
  const { state } = useLocation();
  const phone = state?.phone;

  const {
    password,
    setPassword,
    confirm,
    setConfirm,
    error,
    handleSubmit,
  } = useResetPasswordByPhone(phone);

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
          <FaKey className="text-gold text-3xl" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 text-brown">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            className="w-full p-4 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full p-4 mb-4 border rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button className="w-full bg-brown text-white py-3 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
