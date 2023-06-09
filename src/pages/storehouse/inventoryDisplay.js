import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import './inventory.css';

const InventoryDisplay = forwardRef((props, ref) => {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {

    if (!props.selectedWarehouse) {
      return;
    }

    fetch(`http://192.168.43.148:8080/storehouse/inv/${props.selectedWarehouse}`)
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectedWarehouse]);

  const updateInventory = () => {
    fetch(`http://192.168.43.148:8080/storehouse/inv/${props.selectedWarehouse}`)
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useImperativeHandle(ref, () => ({
    TriggeredFunc() {
      updateInventory();
    }
  }));;

  if (inventory.length === 0) {
    return <p>No products found in inventory.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "800px",height:"1000px",overflow:"Scroll" }} ref={ref}>
      {inventory.length !== 0 && inventory.map((item) => (
        <div className="inventory-card" key={item.product.id}>
           <img src={item.product.url} alt={item.product.name} className="product-image" />
          <h3 style={{ marginBottom: "10px" }}>{"Product Id: "+item.product.id }</h3>
          <h3>{" Name: " + item.product.name}</h3>
          <p style={{ height: "50px", overflow: "hidden", transition: "height 0.5s" }}>{item.product.description}</p>
          <p>Price: {item.product.price} USD</p>
          <p>Quantity: {item.quantity}</p>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
});

export default InventoryDisplay;
