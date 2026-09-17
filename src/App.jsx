const API_URL = "https://finance-dashboard-jhqq.onrender.com";
import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Charts from "./components/Charts";
import Table from "./components/Table";
import Insights from "./components/Insights";
import Reports from "./components/Reports";
import MLPrediction from "./components/MLPrediction";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [page, setPage] = useState("dashboard");

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/dashboard-data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        return response.json();
      })
      .then((data) => {
        console.log("DASHBOARD DATA:", data);

        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);

        setError(
          "Cannot connect to finance backend. Make sure Flask is running."
        );

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="layout">
        <Sidebar setPage={setPage} />

        <div className="main">
          <Header
            role={role}
            setRole={setRole}
          />

          <div className="loading">
            Loading financial dataset...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout">
        <Sidebar setPage={setPage} />

        <div className="main">
          <Header
            role={role}
            setRole={setRole}
          />

          <div className="error">
            ⚠️ {error}
          </div>
        </div>
      </div>
    );
  }

  const transactions = dashboardData?.transactions || [];
  const summary = dashboardData?.summary || {};

  return (
    <div className="layout">

      <Sidebar setPage={setPage} />

      <div className="main">

        <Header
          role={role}
          setRole={setRole}
        />

        {/* ================= DASHBOARD ================= */}

        {page === "dashboard" && (
          <>
            <div className="page-title">
              <h2>Investment Dashboard</h2>

              <p>
                Startup investment analytics based on historical
                financial data.
              </p>
            </div>

            <Cards
              totalInvestment={summary.total_investment}
              totalTransactions={summary.total_transactions}
              averageInvestment={summary.average_investment}
              largestInvestment={summary.largest_investment}
            />

           <Charts
  yearlyData={dashboardData?.yearly_data}
  industryData={dashboardData?.industry_data}
  cityData={dashboardData?.city_data}
/>
<div className="recent-section">
  <div className="recent-header">
    <div>
      <h2>Recent Investments</h2>
      <p>Latest startup investment records</p>
    </div>

    <button onClick={() => setPage("transactions")}>
      View All
    </button>
  </div>

  <div className="recent-table-wrapper">
    <table className="recent-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Startup</th>
          <th>Industry</th>
          <th>Investment Type</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.slice(0, 5).map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date || "-"}</td>

            <td className="recent-startup">
              {transaction.startup || "-"}
            </td>

            <td>{transaction.industry || "-"}</td>

            <td>
              <span className="recent-type">
                {transaction.investment_type || "-"}
              </span>
            </td>

            <td className="recent-amount">
              ${Number(transaction.amount || 0).toLocaleString("en-US")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

            <Insights
              transactions={transactions}
              summary={summary}
            />
          </>
        )}

        {/* ================= TRANSACTIONS ================= */}

        {page === "transactions" && (
          <>
            <div className="page-title">
              <h2>Investment Transactions</h2>

              <p>
                Historical startup investment records from the
                Finance dataset.
              </p>
            </div>

            <Table data={transactions} />
          </>
        )}

        {/* ================= REPORTS ================= */}

        {page === "reports" && (
          <Reports
            data={dashboardData}
          />
        )}

        {/* ================= ML PREDICTION ================= */}

        {page === "ml-prediction" && (
          <MLPrediction />
        )}

      </div>
    </div>
  );
}