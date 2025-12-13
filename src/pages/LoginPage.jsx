import React from "react";
import bgImage from "/bg4.avif";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-offwhite/5 backdrop-blur-sm"></div>

      <div className="flex flex-col lg:flex-row w-[90%] max-w-[1200px] h-auto lg:h-[650px] bg-offwhite rounded-[32px] shadow-2xl overflow-hidden relative z-10">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 text-brown items-center lg:items-start text-center lg:text-left">
          <div className="text-3xl font-bold mb-5 text-gold">EVENTS</div>

          <div className="text-5xl font-extrabold mb-7">
            PLAN PERFECT <br />
            <span className="text-gold">MOMENTS</span>
          </div>

          <p className="text-lg text-taupe">
            Where Your Celebrations Come to Life.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1 px-6 sm:px-10 lg:px-12 py-10 flex flex-col justify-center items-center">
          <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
            <label className="font-semibold mb-2 block text-taupe">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="Enter email or phone number"
              required
              className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none text-lg bg-offwhite text-brown"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <label className="font-semibold mb-2 block text-taupe">
              Password
            </label>
            <input
              type="password"
              placeholder="************"
              required
              className="w-full p-4 mb-5 rounded-[10px] border border-taupe outline-none text-lg bg-offwhite text-brown"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="text-left mb-5">
              <Link
                to="/forgot-password"
                className="text-gold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brown text-offwhite font-bold text-xl rounded-[10px] hover:bg-taupe transition"
            >
              LOG IN
            </button>

            <div className="text-center mt-6 text-taupe">
              New here?{" "}
              <Link to="/register" className="text-gold underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
