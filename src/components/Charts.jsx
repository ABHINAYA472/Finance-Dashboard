import { Line, Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Charts({
  yearlyData,
  industryData,
  cityData
}) {
  const yearLabels = Object.keys(yearlyData || {});
  const yearValues = Object.values(yearlyData || {});

  const industryEntries = Object.entries(industryData || {})
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 8);

  const cityEntries = Object.entries(cityData || {})
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 8);

  const lineData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Investment Amount",
        data: yearValues,
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };

  const pieData = {
    labels: industryEntries.map(item => item[0]),
    datasets: [
      {
        label: "Investment by Industry",
        data: industryEntries.map(item => item[1])
      }
    ]
  };

  const barData = {
    labels: cityEntries.map(item => item[0]),
    datasets: [
      {
        label: "Investment Amount",
        data: cityEntries.map(item => item[1]),
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  return (
    <>
      <div className="charts">
        <div className="chart-box">
          <h3>Investment Trend by Year</h3>

          <div className="chart-area">
            <Line
              data={lineData}
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-box">
          <h3>Investment by Industry</h3>

          <div className="chart-area">
            <Pie
              data={pieData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>Top Cities by Investment</h3>

          <div className="chart-area">
            <Bar
              data={barData}
              options={{
                ...chartOptions,
                indexAxis: "y",
                scales: {
                  x: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}