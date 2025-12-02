import React, { useEffect, useState } from "react";
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
    // eslint-disable-next-line
  }, [eventId]);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setSubmitting(true);
    await addTask(eventId, newTask);
    setNewTask("");
    setSubmitting(false);
  };

  // Toggle task status
  const handleToggle = async (task) => {
    await updateTask(eventId, task._id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    
    await deleteTask(eventId, taskId);
   
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-brown mb-6">To-Do List</h3>

      {/* Add task form */}
      <form className="flex gap-3 mb-7" onSubmit={handleAddTask}>
        <input
          type="text"
          className="border bg-offwhite rounded-lg px-4 py-2 w-64 text-lg"
          placeholder="Add task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gold text-brown px-5 py-2 rounded-lg font-bold text-lg hover:bg-brown hover:text-offwhite transition"
          disabled={submitting}
        >
          + Add
        </button>
      </form>

      {loading && <div>Loading tasks...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <ul className="space-y-4">
        {tasks.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-offwhite rounded-xl px-6 py-4 shadow"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.status === "completed"}
                onChange={() =>
                  handleToggle(todo)
                }
                className="h-5 w-5 border-2 border-gold rounded focus:ring-0 cursor-pointer"
              />
              <span
                className={`text-lg text-brown ${
                  todo.status === "completed" ? "line-through opacity-50" : ""
                }`}
              >
                {todo.description}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded font-bold text-base ${
                  todo.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {todo.status === "completed" ? "Done" : "Pending"}
              </span>
              <button
                className="text-gold hover:text-brown transition font-bold px-2 py-1 rounded"
                onClick={() => {
                  console.log(`[button] Delete clicked for task ID=${todo._id}`);
                  handleDelete(todo._id);
                }}
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
