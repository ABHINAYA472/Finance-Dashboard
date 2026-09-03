export default function Sidebar({ setPage, page }) {
  return (
    <div className="sidebar">

      <h2>💰 Finance</h2>

      <ul>

        <li
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </li>

        <li
          className={page === "transactions" ? "active" : ""}
          onClick={() => setPage("transactions")}
        >
          💳 Transactions
        </li>

        <li
          className={page === "reports" ? "active" : ""}
          onClick={() => setPage("reports")}
        >
          📈 Reports
        </li>

      </ul>

    </div>
  );
}