export default function Table({
  data,
  deleteTx,
  role,
}) {
  return (
    <div className="table-section">

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>

            {role === "admin" && (
              <th>Action</th>
            )}
          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td
                colSpan={role === "admin" ? 5 : 4}
              >
                No transactions available
              </td>
            </tr>

          ) : (

            data.map((transaction, index) => (

              <tr key={index}>

                <td>
                  {transaction.date}
                </td>

                <td>
                  ₹{Number(transaction.amount).toLocaleString()}
                </td>

                <td>
                  {transaction.category}
                </td>

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

                {role === "admin" && (
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteTx(index)}
                    >
                      Delete
                    </button>
                  </td>
                )}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}