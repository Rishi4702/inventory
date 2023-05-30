import React from "react";
import ProductChart from './ProductChart'; // Adjust this path to the actual location of your ProductChart.js file
import OrderTimeChart from './OrderTimeChart'; // Adjust this path to the actual location of your OrderTimeChart.js file

function Dash() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' ,padding:"90px"}}>
      <div style={{ height: '1000px', width: '800px' }}>
        <ProductChart />
      </div>
      <div style={{ height: '1000px', width: '800px' }}>
        <OrderTimeChart />
      </div>
    </div>
  );
}

export default Dash;
