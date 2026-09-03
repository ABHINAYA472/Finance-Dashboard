export default function Header({ role, setRole, page }) {

  const pageTitles = {
    dashboard: "Dashboard",
    transactions: "Transactions",
    reports: "Reports",
  };

  return (
    <div className="header">

      <h2>
        {pageTitles[page] || "Dashboard"}
      </h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="viewer">
          Viewer
        </option>

        <option value="admin">
          Admin
        </option>
      </select>

    </div>
  );
}