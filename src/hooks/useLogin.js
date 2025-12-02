import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(email, password);
      if (response.data.success) {
        // No localStorage, tokens handled via HttpOnly cookies
        navigate("/landing");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch {
      setError("Login failed, please try again");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
