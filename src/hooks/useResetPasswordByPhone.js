import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordByPhone } from "../services/api";

export function useResetPasswordByPhone(phone) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPasswordByPhone(phone, password);

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Password reset failed");
    }
  };

  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    error,
    handleSubmit,
  };
}
