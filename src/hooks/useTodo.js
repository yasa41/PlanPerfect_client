import { useState } from "react";
import {
  fetchToDoListByEvent,
  addTaskToEvent,
  deleteTaskFromEvent,
  updateTaskInEvent,
} from "../services/api"; // modify path if needed

export function useToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all tasks for an event
  const fetchTasks = async (eventId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchToDoListByEvent(eventId);
      if (res.data.success) setTasks(res.data.tasks || []);
      else setError(res.data.message || "Failed to fetch tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tasks");
    }
    setLoading(false);
  };

  // Add a new task
  const addTask = async (eventId, description) => {
    setLoading(true);
    setError("");
    try {
      const res = await addTaskToEvent(eventId, description);
      if (res.data.success) setTasks(res.data.tasks || []);
      else setError(res.data.message || "Failed to add task");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding task");
    }
    setLoading(false);
  };

  // Delete a task
  const deleteTask = async (eventId, taskId) => {
    setLoading(true);
    setError("");
    try {
      const res = await deleteTaskFromEvent(eventId, taskId);
      if (res.data.success) setTasks(res.data.tasks || []);
      else setError(res.data.message || "Failed to delete task");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting task");
    }
    setLoading(false);
  };

  // Update a task (status/description)
  const updateTask = async (eventId, taskId, { status, description }) => {
    setLoading(true);
    setError("");
    try {
      const res = await updateTaskInEvent(eventId, taskId, { status, description });
      if (res.data.success) setTasks(res.data.tasks || []);
      else setError(res.data.message || "Failed to update task");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating task");
    }
    setLoading(false);
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  };
}
