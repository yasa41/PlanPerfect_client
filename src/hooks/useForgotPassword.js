import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestPasswordReset,
  requestPasswordResetByPhone,
} from "../services/api";

// User types 10 digits → we send +91XXXXXXXXXX
const isValidIndianPhone = (value) => /^\d{10}$/.test(value);

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function useForgotPassword() {
  const [mode, setMode] = useState("email"); // "email" | "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // 10-digit input only
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (mode === "email") {
        if (!isValidEmail(email)) {
          setError("Please enter a valid email address");
          return;
        }

        const res = await requestPasswordReset(email);

        if (res.data.success) {
          setSuccessMessage(
            "Reset email sent! Please check your inbox."
          );

          // ✅ EMAIL → LOGIN
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setError(res.data.message || "Something went wrong");
        }

      } else {
        if (!isValidIndianPhone(phone)) {
          setError("Phone number must be exactly 10 digits");
          return;
        }

        const formattedPhone = `+91${phone}`;
        const res = await requestPasswordResetByPhone(formattedPhone);

        if (res.data.success) {
          // ✅ PHONE → OTP PAGE
          navigate("/verify-phone-otp", {
            state: { phone: formattedPhone },
          });
        } else {
          setError(res.data.message || "Something went wrong");
        }
      }
    } catch {
      setError("Request failed, please try again");
    }
  };

  return {
    mode,
    setMode,
    email,
    setEmail,
    phone,
    setPhone,
    error,
    successMessage,
    handleSubmit,
  };
}
