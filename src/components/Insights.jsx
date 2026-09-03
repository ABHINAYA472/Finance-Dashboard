export default function Insights({
  transactions,
  income,
  expense,
  balance,
}) {

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categoryTotals = {};

  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) +
      Number(transaction.amount);
  });

  let highestCategory = "None";
  let highestAmount = 0;

  Object.keys(categoryTotals).forEach((category) => {
    if (categoryTotals[category] > highestAmount) {
      highestAmount = categoryTotals[category];
      highestCategory = category;
    }
  });

  return (
    <div className="insights">

      <h3>💡 Insights</h3>

      <p>
        Highest Spending:{" "}
        <strong>{highestCategory}</strong>
      </p>

      <p>
        Highest Spending Amount:{" "}
        <strong>
          ₹{highestAmount.toLocaleString()}
        </strong>
      </p>

      <p>
        Total Income:{" "}
        <strong>
          ₹{income.toLocaleString()}
        </strong>
      </p>

      <p>
        Total Expenses:{" "}
        <strong>
          ₹{expense.toLocaleString()}
        </strong>
      </p>

      <p>
        Current Balance:{" "}
        <strong>
          ₹{balance.toLocaleString()}
        </strong>
      </p>

    </div>
  );
}