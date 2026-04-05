export default function Header({ role, setRole }) {
  return (
    <div className="header">
      <h2>Dashboard</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}