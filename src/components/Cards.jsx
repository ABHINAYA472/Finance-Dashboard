export default function Cards({ balance, income, expense }) {
  return (
    <div className="top-cards">
      <div className="card balance">Balance ₹{balance}</div>
      <div className="card income">Income ₹{income}</div>
      <div className="card expense">Expenses ₹{expense}</div>
    </div>
  );
}