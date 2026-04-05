import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// ✅ REQUIRED (this was missing)
ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Charts({ lineData, pieData }) {
  return (
    <div className="charts">
      <div className="chart-box">
        <h3>Trend</h3>
        <Line data={lineData} />
      </div>

      <div className="chart-box">
        <h3>Spending</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}