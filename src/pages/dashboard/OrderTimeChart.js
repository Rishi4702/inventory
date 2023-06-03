import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

function OrderTimeChart() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const api = "http://192.168.43.148:8080/order/raport/user";
  const accessToken = localStorage.getItem("accessToken");

  const fetchOrderData = async () => {
    try {
      const { data: orders } = await axios.get(api, { headers: { Authorization: `Bearer ${accessToken}` } });
      const timeCount = {};
      console.log(orders);
      orders.forEach((order) => {
        if (!order.createdAt) {
          return;
        }

        const orderTime = format(new Date(order.createdAt), "HH:mm");
        if (timeCount[orderTime]) {
          timeCount[orderTime]++;
        } else {
          timeCount[orderTime] = 1;
        }
      });

      const timeLabels = Object.keys(timeCount).sort();
      const orderCounts = timeLabels.map((time) => timeCount[time]);

      setLabels(timeLabels);
      setData(orderCounts);
    } catch (error) {
      console.error(`Error fetching data: `, error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Frequency of Orders Each Hour",
        data: data,
        borderColor: "#007bff",
        borderWidth: 2,
        fill: false
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
        title: {
          display: true,
          text: "Hour",
          color: "#FF0000", // Red color
        }
      },
      y: {
        title: {
          display: true,
          text: "Frequency"
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "right"
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };


  return <Line data={lineData} options={options} />;
}

export default OrderTimeChart;
