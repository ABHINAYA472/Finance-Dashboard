import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Charts from "./components/Charts";
import Table from "./components/Table";
import Insights from "./components/Insights";
import Reports from "./components/Reports";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [page, setPage] = useState("dashboard");

  const [transactions, setTransactions] = useState([
    {
      date: "Apr 1",
      amount: 500,
      category: "Food",
      type: "expense",
    },
    {
      date: "Apr 2",
      amount: 2000,
      category: "Salary",
      type: "income",
    },
    {
      date: "Apr 3",
      amount: 800,
      category: "Travel",
      type: "expense",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add transaction
  const addTransaction = () => {
    if (!form.date || !form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };

    setTransactions([...transactions, newTransaction]);

    setForm({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });

    setShowForm(false);
  };

  // Delete transaction
  const deleteTransaction = (index) => {
    if (role !== "admin") {
      alert("Only Admin can delete transactions.");
      return;
    }

    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  // Calculate income
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + Number(t.amount), 0);

  // Calculate expenses
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + Number(t.amount), 0);

  // Calculate balance
  const balance = income - expense;

  // Line chart data
  const lineData = {
    labels: transactions.map((t) => t.date),

    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((t) => t.amount),
        borderWidth: 3,
        tension: 0.3,
      },
    ],
  };

  // Category-wise expense calculation
  const categoryData = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + Number(t.amount);
    }
  });

  const pieData = {
    labels: Object.keys(categoryData),

    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryData),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar
        page={page}
        setPage={setPage}
      />

      {/* Main Content */}
      <div className="main">

        {/* Header */}
        <Header
          role={role}
          setRole={setRole}
          page={page}
        />

        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <Cards
              balance={balance}
              income={income}
              expense={expense}
            />

            <Charts
              lineData={lineData}
              pieData={pieData}
            />

            <Insights
              transactions={transactions}
              income={income}
              expense={expense}
              balance={balance}
            />
          </>
        )}

        {/* Transactions */}
        {page === "transactions" && (
          <>
            <div className="page-header">
              <h2>Transactions</h2>

              {role === "admin" && (
                <button
                  className="add-button"
                  onClick={() => setShowForm(true)}
                >
                  + Add Transaction
                </button>
              )}
            </div>

            <Table
              data={transactions}
              deleteTx={deleteTransaction}
              role={role}
            />
          </>
        )}

        {/* Reports */}
        {page === "reports" && (
          <Reports
            transactions={transactions}
            income={income}
            expense={expense}
            balance={balance}
          />
        )}

      </div>

      {/* Add Transaction Modal */}
      {showForm && (
        <div className="modal">

          <div className="modal-content">

            <h3>Add Transaction</h3>

            <input
              name="date"
              placeholder="Date (Example: Apr 10)"
              value={form.date}
              onChange={handleChange}
            />

            <input
              name="amount"
              type="number"
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
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>

            <div className="modal-buttons">

              <button
                className="add-button"
                onClick={addTransaction}
              >
                Add
              </button>

              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}