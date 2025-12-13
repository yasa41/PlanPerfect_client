import React from "react";
import bgImage from "/bg4.avif";
import { FaKey, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPassword() {
  const {
    mode,
    setMode,
    email,
    setEmail,
    phone,
    setPhone,
    error,
    successMessage,
    handleSubmit,
  } = useForgotPassword();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-offwhite/10 backdrop-blur-sm"></div>

      <div className="flex items-center justify-center w-full h-full absolute z-10 px-4">
        <div className="bg-offwhite rounded-[28px] shadow-2xl w-full max-w-[420px] py-8 px-6 sm:px-10 flex flex-col items-center">
          {/* Icon */}
          <div className="mb-4 bg-gold/20 rounded-full p-4">
            <FaKey className="text-gold text-3xl" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-brown mb-2 text-center">
            Forgot password?
          </h2>

          <p className="text-taupe text-center mb-6 text-sm sm:text-base">
            Choose how you want to recover your account.
          </p>

          {/* Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setMode("email")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                mode === "email"
                  ? "bg-brown text-offwhite"
                  : "bg-taupe/20 text-brown"
              }`}
            >
              <FaEnvelope /> Email
            </button>

            <button
              type="button"
              onClick={() => setMode("phone")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                mode === "phone"
                  ? "bg-brown text-offwhite"
                  : "bg-taupe/20 text-brown"
              }`}
            >
              <FaPhoneAlt /> Phone
            </button>
          </div>

          {/* Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            {mode === "email" ? (
              <>
                <label className="font-semibold mb-2 block text-taupe">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none bg-offwhite"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <label className="font-semibold mb-2 block text-taupe">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  required
                  maxLength={10}
                  className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none bg-offwhite"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                />
              </>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-600 mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brown text-offwhite font-bold rounded-[10px] hover:bg-taupe transition"
            >
              {mode === "email" ? "Send reset email" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
