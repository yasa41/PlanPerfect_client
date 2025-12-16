import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  // Static example data
  const tasksData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        label: "Tasks",
        data: [8, 2, 1],
        backgroundColor: ["#D4AF37", "#E5E5E5", "#C0A060"], // gold + gray shades
        borderWidth: 1,
      },
    ],
  };

  const rsvpData = {
    labels: ["RSVP Yes", "RSVP Pending", "RSVP No"],
    datasets: [
      {
        label: "Guests",
        data: [15, 5, 2],
        backgroundColor: ["#D4AF37", "#E5E5E5", "#C0A060"],
        borderWidth: 1,
      },
    ],
  };

  const budgetData = {
    labels: ["Venue", "Decor", "Food", "Entertainment", "Misc"],
    datasets: [
      {
        label: "Budget Spent ($)",
        data: [500, 300, 200, 100, 50],
        backgroundColor: "#D4AF37",
      },
    ],
  };

  return (
    <div className="bg-offwhite min-h-screen w-full font-sans px-4 sm:px-10 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-brown mb-6">Event Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-[28px] shadow-lg p-6">
          <h3 className="text-lg font-semibold text-brown mb-2">Tasks Completion</h3>
          <Pie data={tasksData} />
        </div>

        <div className="bg-white rounded-[28px] shadow-lg p-6">
          <h3 className="text-lg font-semibold text-brown mb-2">RSVP Status</h3>
          <Pie data={rsvpData} />
        </div>

        <div className="bg-white rounded-[28px] shadow-lg p-6">
          <h3 className="text-lg font-semibold text-brown mb-2">Budget Allocation</h3>
          <Bar data={budgetData} options={{ indexAxis: "y" }} />
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-lg p-6">
        <h3 className="text-lg font-semibold text-brown mb-4">Summary</h3>
        <ul className="text-taupe space-y-2">
          <li>Tasks Completed: 8/11</li>
          <li>RSVP Confirmed Guests: 15/22</li>
          <li>Budget Spent: $1150/$1200</li>
        </ul>
      </div>
    </div>
  );
}
