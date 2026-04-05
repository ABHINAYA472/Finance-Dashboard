import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Charts from "./components/Charts";
import Table from "./components/Table";
import Insights from "./components/Insights";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [page, setPage] = useState("dashboard");

  // ✅ Transactions
  const [transactions, setTransactions] = useState([
    { date: "Apr 1", amount: 500, category: "Food", type: "expense" },
    { date: "Apr 2", amount: 2000, category: "Salary", type: "income" },
    { date: "Apr 3", amount: 800, category: "Travel", type: "expense" },
  ]);

  // ✅ Modal + Form State
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });

  // ✅ Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add Transaction (real input)
  const addTransaction = () => {
    if (!form.date || !form.amount || !form.category) return;

    setTransactions([
      ...transactions,
      { ...form, amount: Number(form.amount) }
    ]);

    setForm({ date: "", amount: "", category: "", type: "expense" });
    setShowForm(false);
  };

  // ✅ Delete Transaction
  const deleteTransaction = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  // ✅ Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // ✅ Chart Data
  const lineData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((t) => t.amount),
        borderWidth: 2,
      },
    ],
  };

  const categoryData = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    }
  });

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
      },
    ],
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Main */}
      <div className="main">

        <Header role={role} setRole={setRole} />

        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <Cards balance={balance} income={income} expense={expense} />
            <Charts lineData={lineData} pieData={pieData} />
            <Insights />
          </>
        )}

        {/* Transactions */}
        {page === "transactions" && (
          <>
            <h2>Transactions</h2>

            {role === "admin" && (
              <button onClick={() => setShowForm(true)}>
                + Add Transaction
              </button>
            )}

            <Table
              data={transactions}
              deleteTx={deleteTransaction}
            />
          </>
        )}

        {/* Reports */}
        {page === "reports" && (
          <h2>Reports Coming Soon 📊</h2>
        )}

      </div>

      {/* ✅ MODAL FORM */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Transaction</h3>

            <input
              name="date"
              placeholder="Date"
              value={form.date}
              onChange={handleChange}
            />

            <input
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div className="modal-buttons">
              <button onClick={addTransaction}>Add</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
           