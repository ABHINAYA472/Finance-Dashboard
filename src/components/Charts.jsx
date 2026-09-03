import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Charts({
  lineData,
  pieData,
}) {

  return (
    <div className="charts">

      <div className="chart-box">

        <h3>Transaction Trend</h3>

        <Line
          data={lineData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />

      </div>

      <div className="chart-box">

        <h3>Spending by Category</h3>

        {pieData.labels.length > 0 ? (
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        ) : (
          <p className="no-data">
            No expense data available.
          </p>
        )}

      </div>

    </div>
  );
}