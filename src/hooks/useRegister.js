import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerUser(name, email, password);
      if (response.data.success) {
        // Redirect to login after successful registration
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
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
