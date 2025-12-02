import React from "react";
import bgImage from '/bg4.avif'; 
import { useLogin } from "../hooks/useLogin"; // Adjust path as needed
import { Link } from "react-router-dom";

export default function Login() {
  const { email, setEmail, password, setPassword, error, handleSubmit } = useLogin();

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
      <div className="absolute inset-0 bg-offwhite/5 backdrop-blur-sm"></div>
      <div className="flex flex-row w-[1200px] h-[650px] bg-offwhite rounded-[32px] shadow-2xl overflow-hidden relative z-10">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center px-16 py-8 text-brown font-sans">
          <div className="text-4xl font-bold mb-5 text-gold">EVENTS</div>
          <div className="text-6xl font-extrabold leading-none mb-7 text-brown">
            PLAN PERFECT<br />
            <span className="text-gold">MOMENTS</span>
          </div>
          <div className="text-xl mb-5 text-taupe">
            Where Your Celebrations Come to Life.
          </div>
          <div className="text-lg text-taupe">
            From birthdays to corporate gatherings — create unforgettable memories, effortlessly.
          </div>
        </div>
        {/* Right section */}
        <div className="flex-1  px-12 py-16 flex flex-col justify-center items-center my-16 mr-16">
          <form className="w-full" onSubmit={handleSubmit}>
            <label className="font-semibold mb-2 block text-taupe">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none text-lg bg-offwhite text-brown"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-semibold mb-2 block text-taupe">Password</label>
            <input
              type="password"
              placeholder="************"
              required
              className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none text-lg bg-offwhite text-brown"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mb-5">{error}</p>}
            <div className="text-left mb-5">
              <Link to="/forgot-password" className="text-gold text-base hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-brown text-offwhite font-bold text-xl rounded-[10px] cursor-pointer mb-6 hover:bg-taupe transition"
            >
              LOG IN
            </button>
            <div className="text-center text-base text-taupe">
              Are you new?{" "}
              <Link to="/register" className="text-gold underline hover:text-brown">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
