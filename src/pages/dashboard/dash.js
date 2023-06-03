import React from "react";
import ProductChart from './ProductChart'; // Adjust this path to the actual location of your ProductChart.js file
import OrderTimeChart from './OrderTimeChart'; // Adjust this path to the actual location of your OrderTimeChart.js file
function Dash() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' ,paddingTop:"90px",overflow:'scroll',height:'fit-content'}}>
      <div style={{ height: 'fit-content', width: '800px', marginBottom: '30px' }}>
        <ProductChart />
      </div>
      <div style={{ height: '400px', width: '800px', marginBottom: '90px' }}>
        <OrderTimeChart />
      </div>
    </div>
  );
}


export default Dash;
