import React, { useEffect, useState } from "react";
import { useBudget } from "../../hooks/useBudget";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Budget({ eventId }) {
  const {
    budget,
    status,
    loading,
    error,
    fetchBudget,
    updateTotalBudget,
    addBudgetExpense,
  } = useBudget();

  const [totalBudgetInput, setTotalBudgetInput] = useState("");
  const [expense, setExpense] = useState({ description: "", amount: "" });

  useEffect(() => {
    if (eventId) fetchBudget(eventId);
    if (budget) setTotalBudgetInput(budget.totalBudget || "");
    // eslint-disable-next-line
  }, [eventId, budget?.totalBudget]);

  // Chart Data
  const chartData = {
    labels: ["Total Budget", "Spent"],
    datasets: [
      {
        label: "₹ Amount",
        data: budget ? [budget.totalBudget, budget.spentAmount] : [0, 0],
        backgroundColor: ["#E8D5B3", "#CBB46C"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Budget vs Expenses" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1000 },
        grid: { color: "#ede6da" },
      },
      x: {
        grid: { color: "#ede6da" },
        title: { display: true, text: "Overview" },
      },
    },
  };

  // Handlers
  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    await updateTotalBudget(eventId, parseInt(totalBudgetInput || 0));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expense.description || !expense.amount) return;

    await addBudgetExpense(
      eventId,
      expense.description,
      parseInt(expense.amount)
    );

    setExpense({ description: "", amount: "" });
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl sm:text-3xl font-bold text-brown mb-4">
        Budget Tracking
      </h3>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {/* Set Total Budget */}
      <div
        className="
          mb-6 
          flex flex-col lg:flex-row 
          gap-4 lg:gap-6 
          items-start lg:items-end
        "
      >
        <form
          onSubmit={handleBudgetSubmit}
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-end"
        >
          <label className="font-semibold text-lg text-brown">
            Set Total Budget:
          </label>

          <input
            type="number"
            className="
              border bg-offwhite rounded-lg 
              px-4 py-2 w-full sm:w-32 
              text-base sm:text-lg
            "
            placeholder="₹ amount"
            min="0"
            value={totalBudgetInput}
            onChange={(e) => setTotalBudgetInput(e.target.value)}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="
              bg-gold text-brown px-5 py-2 
              rounded-lg font-bold 
              hover:bg-brown hover:text-offwhite transition
              text-sm sm:text-base
            "
          >
            {budget?.totalBudget ? "Update" : "Set"}
          </button>
        </form>

        <div
          className="
            px-4 py-2 text-gold 
            bg-offwhite rounded-lg font-semibold 
            text-sm sm:text-md
          "
        >
          {status}
        </div>
      </div>

      {/* Chart */}
      <div className="my-8 h-64 sm:h-80 md:h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Add Expense */}
      <form
        className="
          flex flex-col sm:flex-row 
          gap-3 items-start sm:items-end 
          mb-7
        "
        onSubmit={handleAddExpense}
      >
        <input
          type="text"
          className="
            border bg-offwhite rounded-lg 
            px-4 py-2 w-full sm:w-48 
            text-sm sm:text-md
          "
          placeholder="Expense Description"
          value={expense.description}
          onChange={(e) =>
            setExpense((exp) => ({ ...exp, description: e.target.value }))
          }
          required
        />

        <input
          type="number"
          className="
            border bg-offwhite rounded-lg 
            px-4 py-2 w-full sm:w-28 
            text-sm sm:text-md
          "
          min="1"
          placeholder="₹ Amount"
          value={expense.amount}
          onChange={(e) =>
            setExpense((exp) => ({ ...exp, amount: e.target.value }))
          }
          required
        />

        <button
          type="submit"
          className="
            bg-gold text-brown px-5 py-2 
            rounded-lg font-bold 
            hover:bg-brown hover:text-offwhite transition
            text-sm sm:text-base
          "
        >
          + Add Expense
        </button>
      </form>

      {/* Expense History */}
      <div className="overflow-x-auto">
        <table
          className="
            w-full text-sm sm:text-lg 
            table-auto my-4 border-separate border-spacing-y-3
          "
        >
          <thead>
            <tr className="text-taupe font-semibold text-left bg-offwhite">
              <th className="pb-2 pl-2">DESCRIPTION</th>
              <th className="pb-2">AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            {budget?.details?.length ? (
              budget.details.map((expense, idx) => (
                <tr
                  key={idx}
                  className="
                    border rounded-[12px] 
                    text-brown bg-offwhite 
                    hover:bg-gold/20
                  "
                >
                  <td className="py-3 pl-2 font-medium">
                    {expense.description}
                  </td>
                  <td className="py-3">₹{expense.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4">No expenses yet.</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
