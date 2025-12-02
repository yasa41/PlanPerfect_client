// src/hooks/useBudget.js
import { useState } from "react";
import { fetchBudgetByEvent, setOrUpdateBudget, addExpense } from "../services/api";

export function useBudget() {
  const [budget, setBudget] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch event's budget info
  const fetchBudget = async (eventId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchBudgetByEvent(eventId);
      if (res.data.success) {
        setBudget(res.data.budget);
        setStatus(res.data.status);
      } else {
        setError(res.data.message);
        setBudget(null);
        setStatus("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching budget");
    }
    setLoading(false);
  };

  // Set or update total budget
  const updateTotalBudget = async (eventId, totalBudget) => {
    setLoading(true);
    setError("");
    try {
      const res = await setOrUpdateBudget(eventId, totalBudget);
      if (res.data.success) setBudget(res.data.budget);
      else setError(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating budget");
    }
    setLoading(false);
  };

  // Add an expense
  const addBudgetExpense = async (eventId, description, amount) => {
    setLoading(true);
    setError("");
    try {
      const res = await addExpense(eventId, description, amount);
      if (res.data.success) setBudget(res.data.budget);
      else setError(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
    setLoading(false);
  };

  return {
    budget,
    status,
    loading,
    error,
    fetchBudget,
    updateTotalBudget,
    addBudgetExpense,
  };
}
