// hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; // Adjust path if needed

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser();
      // After logout, tokens cleared via cookies on backend, redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle error or show notification
    }
  };

  return { logout };
}
