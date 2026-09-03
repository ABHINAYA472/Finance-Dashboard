import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reports({
  transactions,
  income,
  expense,
  balance,
}) {
  // Calculate expenses by category
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        Number(transaction.amount);
    }
  });

  const categories = Object.keys(categoryTotals);
  const categoryAmounts = Object.values(categoryTotals);

  // Highest spending category
  let highestCategory = "None";
  let highestAmount = 0;

  categories.forEach((category) => {
    if (categoryTotals[category] > highestAmount) {
      highestAmount = categoryTotals[category];
      highestCategory = category;
    }
  });

  // Average expense
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const averageExpense =
    expenseTransactions.length > 0
      ? expense / expenseTransactions.length
      : 0;

  // Savings rate
  const savingsRate =
    income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  // Income vs expense chart
  const incomeExpenseData = {
    labels: ["Income", "Expenses", "Balance"],

    datasets: [
      {
        label: "Amount",
        data: [income, expense, balance],
        borderWidth: 1,
      },
    ],
  };

  // Category chart
  const categoryChartData = {
    labels: categories,

    datasets: [
      {
        label: "Expenses",
        data: categoryAmounts,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="reports">

      <div className="reports-title">
        <div>
          <h2>Financial Reports</h2>
          <p>Overview of your financial activity</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="report-cards">

        <div className="report-card">
          <span>💰</span>
          <p>Total Income</p>
          <h3>₹{income.toLocaleString()}</h3>
        </div>

        <div className="report-card">
          <span>💸</span>
          <p>Total Expenses</p>
          <h3>₹{expense.toLocaleString()}</h3>
        </div>

        <div className="report-card">
          <span>💵</span>
          <p>Current Balance</p>
          <h3>₹{balance.toLocaleString()}</h3>
        </div>

        <div className="report-card">
          <span>🧾</span>
          <p>Transactions</p>
          <h3>{transactions.length}</h3>
        </div>

      </div>

      {/* Charts */}
      <div className="report-charts">

        <div className="report-chart-box">
          <h3>Income vs Expenses</h3>

          {transactions.length > 0 ? (
            <Bar
              data={incomeExpenseData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <p className="no-data">
              No transaction data available.
            </p>
          )}
        </div>

        <div className="report-chart-box">
          <h3>Expenses by Category</h3>

          {categories.length > 0 ? (
            <Doughnut
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <p className="no-data">
              No expense data available.
            </p>
          )}
        </div>

      </div>

      {/* Financial Analysis */}
      <div className="analysis-section">

        <h3>Financial Analysis</h3>

        <div className="analysis-grid">

          <div className="analysis-item">
            <p>Highest Spending Category</p>
            <strong>{highestCategory}</strong>
          </div>

          <div className="analysis-item">
            <p>Highest Category Amount</p>
            <strong>
              ₹{highestAmount.toLocaleString()}
            </strong>
          </div>

          <div className="analysis-item">
            <p>Average Expense</p>
            <strong>
              ₹{Math.round(averageExpense).toLocaleString()}
            </strong>
          </div>

          <div className="analysis-item">
            <p>Savings Rate</p>
            <strong>{savingsRate}%</strong>
          </div>

        </div>

      </div>

      {/* Transaction Report */}
      <div className="report-table-section">

        <h3>Transaction Report</h3>

        {transactions.length === 0 ? (
          <p className="no-data">
            No transactions available.
          </p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>

                  <td>{transaction.date}</td>

                  <td>{transaction.category}</td>

                  <td>
                    <span
                      className={
                        transaction.type === "income"
                          ? "income-label"
                          : "expense-label"
                      }
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td>
                    ₹{Number(transaction.amount).toLocaleString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}