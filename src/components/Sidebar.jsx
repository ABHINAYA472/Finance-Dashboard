export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>💰 Finance</h2>
      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>
        <li onClick={() => setPage("transactions")}>Transactions</li>
        <li onClick={() => setPage("reports")}>Reports</li>
      </ul>
    </div>
  );
}