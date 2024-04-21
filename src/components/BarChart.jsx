import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ itemsArr }) => {
  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: Math.max(...itemsArr) + 3,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const labels = [
    "0 - 100",
    "101 - 200",
    "201 - 300",
    "301 - 400",
    "401 - 500",
    "501 - 600",
    "601 - 700",
    "701 - 800",
    "801 - 900",
    "901 - above",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Price Range",
        data: itemsArr,
        backgroundColor: "rgba(225, 88, 105, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
