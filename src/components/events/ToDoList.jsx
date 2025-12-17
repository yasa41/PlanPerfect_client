import React, { useEffect, useState, useMemo } from "react";
import { useToDoList } from "../../hooks/useTodo.js";

export default function ToDoList({ eventId }) {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  } = useToDoList();

  const [newTask, setNewTask] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (eventId) fetchTasks(eventId);
  }, [eventId]);

  // =========================
  // Progress Calculation
  // =========================
  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === "completed").length,
    [tasks]
  );
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // =========================
  // Handlers
  // =========================
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setSubmitting(true);
    await addTask(eventId, newTask);
    setNewTask("");
    setSubmitting(false);
  };

  const handleToggle = async (task) => {
    await updateTask(eventId, task._id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  const handleDelete = async (taskId) => {
    await deleteTask(eventId, taskId);
  };

  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold text-brown mb-4">To-Do List</h3>

      {/* ========================= */}
      {/* PROGRESS BAR */}
      {/* ========================= */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-gold h-4 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="text-sm text-right text-brown font-semibold mb-4">
        {completedCount} of {totalCount} tasks completed ({progressPercent}%)
      </div>

      {/* ========================= */}
      {/* ADD TASK FORM */}
      {/* ========================= */}
      <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7" onSubmit={handleAddTask}>
        <input
          type="text"
          className="border bg-offwhite rounded-lg px-4 py-2 w-full sm:w-64 text-base sm:text-lg focus:ring-2 focus:ring-gold focus:outline-none transition"
          placeholder="Add task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gold text-brown px-5 py-2 rounded-lg font-bold text-base sm:text-lg hover:bg-brown hover:text-offwhite transition"
          disabled={submitting}
        >
          + Add
        </button>
      </form>

      {loading && <div>Loading tasks...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && tasks.length === 0 && <div className="text-gray-400">No tasks yet. Add one above!</div>}

      {/* ========================= */}
      {/* TASK LIST */}
      {/* ========================= */}
      <ul className="space-y-4">
        {tasks.map((todo) => (
          <li
            key={todo._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-offwhite rounded-xl px-4 sm:px-6 py-4 shadow gap-4 sm:gap-0 transition-all hover:scale-[1.01]"
          >
            {/* Left: Checkbox + Description */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <input
                type="checkbox"
                checked={todo.status === "completed"}
                onChange={() => handleToggle(todo)}
                className="h-5 w-5 border-2 border-gold rounded focus:ring-0 cursor-pointer"
              />
              <span
                className={`text-base sm:text-lg text-brown ${
                  todo.status === "completed" ? "line-through opacity-50" : ""
                }`}
              >
                {todo.description}
              </span>
            </div>

            {/* Right: Status + Delete */}
            <div className="flex items-center gap-3">
              <span
                className={`px-3 sm:px-4 py-1.5 rounded font-bold text-xs sm:text-sm md:text-base ${
                  todo.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {todo.status === "completed" ? "Done" : "Pending"}
              </span>
              <button
                className="text-gold hover:text-brown transition font-bold text-lg px-1"
                onClick={() => handleDelete(todo._id)}
                title="Delete task"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
