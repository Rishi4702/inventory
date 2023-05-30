import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function ProductChart() {
  const [productFrequency, setProductFrequency] = useState({});

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get('http://localhost:8080/order/raport/user', config);
        const orders = response.data;
        let frequency = {};

        orders.forEach(order => {
          order.items.forEach(item => {
            if (frequency[item.productDto.name]) {
              frequency[item.productDto.name] += item.quantity;
            } else {
              frequency[item.productDto.name] = item.quantity;
            }
          });
        });

        setProductFrequency(frequency);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchProductData();
  }, []);

  const productNames = Object.keys(productFrequency);
  const productQuantities = Object.values(productFrequency);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Product Frequency',
        data: productQuantities,
        backgroundColor: ' #007bff', // Set the background color to #d5e5f5
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      {Object.keys(productFrequency).length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
}

export default ProductChart;
