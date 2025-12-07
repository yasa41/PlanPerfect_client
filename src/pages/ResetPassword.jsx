import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bgImage from "/bg4.avif";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-offwhite/5 backdrop-blur-sm"></div>

      {/* Card Container */}
      <div className="
        flex flex-col lg:flex-row 
        w-[90%] max-w-[1200px] 
        h-auto lg:h-[650px] 
        bg-offwhite rounded-[32px] shadow-2xl overflow-hidden relative z-10
      ">

        {/* LEFT SECTION */}
        <div className="
          flex-1 flex flex-col justify-center 
          px-6 sm:px-10 lg:px-16 
          py-10 text-brown font-sans
          items-center lg:items-start text-center lg:text-left
        ">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none mb-5 text-brown">
            RESET<br />
            <span className="text-gold">PASSWORD</span>
          </h1>

          <p className="text-lg sm:text-xl text-taupe">
            Enter a new password to access your account.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="
          flex-1 px-6 sm:px-10 lg:px-12 
          py-10 lg:py-16 
          flex flex-col justify-center items-center
        ">
          <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>

            <label className="font-semibold mb-2 block text-taupe">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              required
              className="
                w-full p-4 mb-5 rounded-[10px] 
                border border-taupe outline-none 
                text-lg bg-offwhite text-brown
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && (
              <p className="text-center text-brown mb-4 font-semibold">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="
                w-full py-4 bg-brown text-offwhite 
                font-bold text-xl rounded-[10px] cursor-pointer 
                mb-6 hover:bg-taupe transition
              "
            >
              RESET PASSWORD
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
