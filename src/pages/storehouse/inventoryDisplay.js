import React, { useState, useEffect } from "react";
import './inventory.css';

function InventoryDisplay(props) {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Make request to API with selected warehouse ID

    if (!props.selectedWarehouse) {
      return;
    }

    fetch(`http://localhost:8080/storehouse/inv/${props.selectedWarehouse}`)
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectedWarehouse]);

  console.log(inventory);

  if (inventory.length === 0) {
    return <p>No products found in inventory.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" ,width:"800px"}}>
      {inventory.length!=0&&inventory.map((item) => (
        <div className="inventory-card" key={item.product.id}>
          <h3 style={{ marginBottom: "10px" }}>{item.product.id + " Name: " + item.product.name}</h3>
          <p style={{ height: "50px", overflow: "hidden", transition: "height 0.5s" }}>{item.product.description}</p>
          <p>Price: {item.product.price} USD</p>
          <p>Quantity: {item.quantity}</p>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default InventoryDisplay;
