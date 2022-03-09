import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import db, { useAuth } from "../firebase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, interval }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const prices = Object?.values(data[interval]);
  const labels = Object?.keys(data[interval]);

  const data3 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        // data: labels?.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [1, 2, 3, 4, 5, 6, 7],
        data: prices?.map((data) => data["4. close"]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        // data: labels?.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [1, 2, 3, 4, 5, 6, 7],
        data: prices?.map((data) => data["4. close"]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data3} />;
}

export default LineChart;
