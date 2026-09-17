export default function Insights({
  transactions = [],
  summary = {}
}) {
  const totalInvestment =
    Number(summary.total_investment || 0);

  const averageInvestment =
    Number(summary.average_investment || 0);

  const largestInvestment =
    Number(summary.largest_investment || 0);

  const totalTransactions =
    Number(
      summary.total_transactions ||
      transactions.length ||
      0
    );

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="insights">

      <h2>
        Financial Insights
      </h2>

      <div className="insight-grid">

        <div className="insight-card">
          <h3>Total Investment</h3>

          <p>
            ${formatAmount(totalInvestment)}
          </p>
        </div>

        <div className="insight-card">
          <h3>Total Transactions</h3>

          <p>
            {totalTransactions.toLocaleString()}
          </p>
        </div>

        <div className="insight-card">
          <h3>Average Investment</h3>

          <p>
            ${formatAmount(averageInvestment)}
          </p>
        </div>

        <div className="insight-card">
          <h3>Largest Investment</h3>

          <p>
            ${formatAmount(largestInvestment)}
          </p>
        </div>

      </div>

    </div>
  );
}