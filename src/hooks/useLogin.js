import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidIndianPhone = (value) =>
  /^\d{10}$/.test(value); // user types 10 digits only

export function useLogin() {
  const [identifier, setIdentifier] = useState(""); // email OR phone
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let payload = { password };

    // EMAIL LOGIN
    if (identifier.includes("@")) {
      if (!isValidEmail(identifier)) {
        setError("Please enter a valid email address");
        return;
      }
      payload.email = identifier;
    }
    // PHONE LOGIN
    else {
      if (!isValidIndianPhone(identifier)) {
        setError("Phone number must be exactly 10 digits");
        return;
      }
      payload.phone = `+91${identifier}`; // prepend +91
    }

    try {
      const response = await loginUser(payload);

      if (response.data.success) {
        navigate("/landing");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch {
      setError("Login failed, please try again");
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
