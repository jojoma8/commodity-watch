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

function LineChart({ sourceData, commodity }) {
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: commodity,
      },
    },
  };

  // const prices = Object?.values(data[interval]);
  // const labels = Object?.keys(data[interval]);

  // const data3 = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       // data: labels?.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       // data: [1, 2, 3, 4, 5, 6, 7],
  //       data: prices?.map((data) => data["4. close"]),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       // data: labels?.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       // data: [1, 2, 3, 4, 5, 6, 7],
  //       data: prices?.map((data) => data["4. close"]),
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };

  const labels = Object.keys(sourceData);
  const monthsNumber = Object.keys(sourceData).length;

  if (Object.values(sourceData)[0] !== undefined) {
    if (Object.values(sourceData)[0].rates) {
      const currentValue =
        Object.values(sourceData)[monthsNumber - 1].rates[commodity];
      const prevPeriodValue =
        Object.values(sourceData)[monthsNumber - 2].rates[commodity];
      const firstPeriodValue = Object.values(sourceData)[0].rates[commodity];
    }
  }

  const fullPeriodPctCh = () => {
    if (typeof currentValue !== "undefined") {
      if (currentValue !== 0) {
        return ((currentValue / firstPeriodValue - 1) * 100).toFixed(2);
      } else {
        return 0;
      }
    } else return 0;
  };

  const prevPeriodPctCh = () => {
    if (typeof currentValue !== "undefined") {
      if (currentValue !== 0) {
        return ((currentValue / prevPeriodValue - 1) * 100).toFixed(2);
      } else {
        return 0;
      }
    } else return 0;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: commodity,

        data: Object.values(sourceData).map((data) => data.rates[commodity]),
        borderColor: "rgb(79 70 229)",
        backgroundColor: "rgba(79 70 229)",
      },
    ],
  };

  const textColor = (value = 0) => {
    if (value > 0) {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };

  // return <Line options={options} data={data3} />;
  return (
    <div className="p-2 max-w-lg md:m-0 m-3 border">
      <Line options={chartOptions} data={chartData} />
      <div className="flex place-content-center text-sm ">
        <div className="flex mx-2">
          {monthsNumber} Mo:{" "}
          <div className={textColor(fullPeriodPctCh())}>
            {fullPeriodPctCh()}%
          </div>
        </div>
        <div className="flex mx-2">
          Prev Mo:
          <div className={textColor(prevPeriodPctCh())}>
            {prevPeriodPctCh()}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineChart;
