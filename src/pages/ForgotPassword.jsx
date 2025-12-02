import React from "react";
import bgImage from '/bg4.avif';
import { FaKey } from "react-icons/fa";
import { useForgotPassword } from "../hooks/useForgotPassword"; // Adjust path as needed

export default function ForgotPassword() {
  const { email, setEmail, error, successMessage, handleSubmit } = useForgotPassword();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-offwhite/10 backdrop-blur-sm"></div>
      <div className="flex items-center justify-center w-full h-full absolute z-10">
        <div className="bg-offwhite rounded-[32px] shadow-2xl w-[420px] py-10 px-10 flex flex-col items-center">
          <div className="mb-4 bg-gold/20 rounded-full p-4 flex items-center justify-center">
            <FaKey className="text-gold text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-brown mb-2 text-center">Forgot password?</h2>
          <p className="text-taupe text-center mb-6 text-base">
            We'll send you the updated instructions shortly.
          </p>
          <form className="w-full mt-2" onSubmit={handleSubmit}>
            <label className="font-semibold mb-2 block text-taupe">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 mb-6 rounded-[10px] border border-taupe outline-none text-lg bg-offwhite text-brown"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-brown text-offwhite font-bold text-lg rounded-[10px] cursor-pointer hover:bg-taupe transition"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
