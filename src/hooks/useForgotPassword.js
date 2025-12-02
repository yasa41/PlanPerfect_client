import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/api";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await requestPasswordReset(email);
      if (response.data.success) {
        setSuccessMessage("Reset email sent! Please check your inbox.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(response.data.message || "Error sending reset email");
      }
    } catch {
      setError("Error sending reset email, please try again");
    }
  };

  return {
    email,
    setEmail,
    error,
    successMessage,
    handleSubmit,
  };
}
