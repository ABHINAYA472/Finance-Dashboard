export default function Cards({
  balance,
  income,
  expense,
}) {
  return (
    <div className="top-cards">

      <div className="card balance">
        <span>💰</span>
        <p>Balance</p>
        <h3>₹{balance.toLocaleString()}</h3>
      </div>

      <div className="card income">
        <span>📈</span>
        <p>Income</p>
        <h3>₹{income.toLocaleString()}</h3>
      </div>

      <div className="card expense">
        <span>📉</span>
        <p>Expenses</p>
        <h3>₹{expense.toLocaleString()}</h3>
      </div>

    </div>
  );
}