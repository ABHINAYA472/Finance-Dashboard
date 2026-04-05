export default function Table({ data, deleteTx }) {
  return (
    <div className="table-section">
      <h2>Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No transactions available</td>
            </tr>
          ) : (
            data.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td
                  style={{
                    color: t.type === "income" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {t.type}
                </td>
                <td>
                  <button onClick={() => deleteTx(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}