import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import db, { useAuth } from "../firebase";
import LineChart from "./LineChart";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Commodities = () => {
  const [dataRes, setDataRes] = useState({});

  useEffect(() => {
    // enable this to refresh API
    // getDailyAPIData();
    // getData();
    // change this with today's date
    checkData("2021-12-31");
  }, []);

  const checkData = async (date) => {
    // check if daily data is already in firebase
    const q = query(collection(db, "data"), where(date, "!=", null));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // if data does not exist, fetch from API
      console.log("data does not exist");
      getDailyAPIData(date);
    } else {
      // if data exists, just load existing data
      console.log("data exists");
      getData();
    }
  };

  const getDailyAPIData = async (date) => {
    const data = await fetch(
      // `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=LIQ2FPH9NW4EP2YL`
      `https://commodities-api.com/api/${date}?access_key=${process.env.REACT_APP_COMMODITIES_API}`
    )
      .then((res) => res.json())
      //   .then((data) => console.log(data["Time Series (5min)"]))
      .then((data) => handleAddData(data))
      // .then((data) => setDataRes(data))
      //   .then((data) => console.log(data))
      .catch((error) => console.log("api error: " + error));
    // const result = data.json();
    // setData(result);
  };

  const handleAddData = async (data) => {
    console.log("API data fetched");
    // console.log("data: " + data.data.date);
    const docRef = doc(db, "data", "daily");
    const dateChar = data.data.date;
    const newData = {};
    newData[dateChar] = data.data;
    const payload = newData;

    const docSnap = await getDoc(docRef);

    // check if rates data are available
    if (data.data.rates.length > 0) {
      console.log("rate non-blank");
      setDataRes(data);
      if (docSnap.exists()) {
        updateDoc(docRef, payload).then(() =>
          console.log("firebase doc updated")
        );
      } else {
        setDoc(docRef, payload).then(() => console.log("firebase doc created"));
      }
    } else {
      console.log("rates unavailable");
    }
  };

  const getData = async () => {
    console.log("data: " + dataRes);
    const docRef = doc(db, "data", "daily");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("data result " + docSnap.data()["2021-12-31"].date);
      // console.log("docSnap " + docSnap.data());
      setDataRes(docSnap.data());
    } else console.log("no data found");
  };

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

  const labels = Object.keys(dataRes);
  // const labels = ["1", "2", "3"];
  const dataTest = {
    labels,
    datasets: [
      {
        label: "test1",
        // data: [1, 2, 3],
        data: Object.values(dataRes).map((data) => data.rates.SOYBEAN),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col">
      Commodities
      {/* {data?.data.base} */}
      {/* <button onClick={() => getDailyAPIData()}>Fetch</button> */}
      {/* <LineChart /> */}
      {/* {dataRes.map((data) => data.map((result) => <div>{result.date}</div>))} */}
      {/* {Object.values(dataRes).map((dates) => (
        <div>{dates.base}</div>
      ))} */}
      <Line options={options} data={dataTest} />
      {/* <Line /> */}
    </div>
  );
};

export default Commodities;
