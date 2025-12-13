import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPhoneOtp } from "../services/api";

export function useVerifyPhoneOtp(phone) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      const res = await verifyPhoneOtp(phone, otp);

      if (res.data.success) {
        navigate("/reset-password-phone", {
          state: { phone },
        });
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch {
      setError("OTP verification failed");
    }
  };

  return {
    otp,
    setOtp,
    error,
    handleSubmit,
  };
}
