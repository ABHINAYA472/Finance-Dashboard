export default function Cards({
  totalInvestment,
  totalTransactions,
  averageInvestment,
  largestInvestment
}) {
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="top-cards">

      <div className="card balance">
        <h3>Total Investment</h3>

        <p>
          ${formatAmount(totalInvestment)}
        </p>
      </div>

      <div className="card income">
        <h3>Total Records</h3>

        <p>
          {Number(totalTransactions || 0).toLocaleString()}
        </p>
      </div>

      <div className="card expense">
        <h3>Average Investment</h3>

        <p>
          ${formatAmount(averageInvestment)}
        </p>
      </div>

      <div className="card">
        <h3>Largest Investment</h3>

        <p>
          ${formatAmount(largestInvestment)}
        </p>
      </div>

    </div>
  );
}