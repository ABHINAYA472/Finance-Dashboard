export default function Table({ data = [] }) {
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="transaction-table-container">

      <div className="transaction-table-header">
        <div>
          <h3>Investment Transactions</h3>
          <p>Recent startup investment records</p>
        </div>

        <span>
          {data.length.toLocaleString()} Records
        </span>
      </div>

      <div className="table-wrapper">

        <table className="transaction-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Startup</th>
              <th>Industry</th>
              <th>City</th>
              <th>Investment Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 50).map((transaction, index) => (
              <tr key={index}>

                <td>
                  {transaction.date || "-"}
                </td>

                <td className="startup-name">
                  {transaction.startup || "-"}
                </td>

                <td>
                  {transaction.industry || "-"}
                </td>

                <td>
                  {transaction.city || "-"}
                </td>

                <td>
                  <span className="investment-type">
                    {transaction.investment_type || "-"}
                  </span>
                </td>

                <td className="amount">
                  ${formatAmount(transaction.amount)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {data.length > 50 && (
        <div className="table-footer">
          Showing 50 of {data.length.toLocaleString()} records
        </div>
      )}

    </div>
  );
}