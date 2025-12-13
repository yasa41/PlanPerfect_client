import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// user types ONLY 10 digits
const isValidIndianPhone = (value) =>
  /^\d{10}$/.test(value);

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // 10-digit input
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // EMAIL validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // PHONE validation
    if (!isValidIndianPhone(phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    // 🔥 prepend +91 before sending to backend
    const formattedPhone = `+91${phone}`;

    try {
      const response = await registerUser(
        name,
        email,
        password,
        formattedPhone
      );

      if (response.data.success) {
        navigate("/landing");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch {
      setError("Registration failed, please try again");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
