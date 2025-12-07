import React from "react";
import bgImage from '/bg4.avif';
import { FaKey } from "react-icons/fa";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPassword() {
  const { email, setEmail, error, successMessage, handleSubmit } = useForgotPassword();

  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center 
        relative overflow-hidden
      "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-offwhite/10 backdrop-blur-sm"></div>

      {/* Centered Container */}
      <div className="flex items-center justify-center w-full h-full absolute z-10 px-4">
        <div
          className="
            bg-offwhite rounded-[28px] shadow-2xl 
            w-full max-w-[420px] 
            py-8 sm:py-10 px-6 sm:px-10 
            flex flex-col items-center
          "
        >
          {/* Icon */}
          <div className="mb-4 bg-gold/20 rounded-full p-4 flex items-center justify-center">
            <FaKey className="text-gold text-3xl sm:text-4xl" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-brown mb-2 text-center">
            Forgot password?
          </h2>

          <p className="text-taupe text-center mb-6 text-sm sm:text-base">
            We'll send you the updated instructions shortly.
          </p>

          {/* Form */}
          <form className="w-full mt-2" onSubmit={handleSubmit}>
            <label className="font-semibold mb-2 block text-taupe">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="
                w-full p-3 sm:p-4 mb-6 
                rounded-[10px] border border-taupe 
                outline-none text-base sm:text-lg 
                bg-offwhite text-brown
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Messages */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

            <button
              type="submit"
              className="
                w-full py-3 
                bg-brown text-offwhite font-bold 
                text-base sm:text-lg 
                rounded-[10px] cursor-pointer 
                hover:bg-taupe transition
              "
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
