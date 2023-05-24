import React, { useState, useEffect, useReducer, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import './inventory.css';

const OrderInventoryDisplay = forwardRef((props, ref) => {

  const [inventory, setInventory] = useState([]);
  const [orderAmount, setOrderAmount] = useState(0);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {

    if (!props.selectedWarehouse) {
      return;
    }
    updateInventory();
  }, [props.selectedWarehouse]);

  const updateInventory = () => {
    fetch(`http://10.8.0.6:8080/storehouse/inv/${props.selectedWarehouse}`)
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const submitOrder = async (productId) => {
    // Get managinig storehouse id
    const token = localStorage.getItem('accessToken');
    const storeHouseData = await axios.get('http://10.8.0.6:8080/users/storehouses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((error) => {
      console.log(error);
    });

    const wareHouseId = storeHouseData.data[0].id;
    const payload = {
      formStorehouseId: props.selectedWarehouse,
      toStorehouseId: wareHouseId,
      items: [
        {
          productId: productId,
          quantity: orderAmount
        }
      ]
    };

    console.log(payload)

    axios.post('http://10.8.0.6:8080/order', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useImperativeHandle(ref, () => ({
    TriggeredFunc() {
      updateInventory();
    }
  }));

  // const forceUpdateInv = () => {
  //   console.log('forceUpdateInv inside inventoryDisplay')
  //   forceUpdate();
  // }

  if (inventory.length === 0) {
    return <p>No products found in inventory.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "800px" }} ref={ref}>
      {inventory.length !== 0 && inventory.map((item) => (
        <div className="inventory-card" key={item.product.id}>
          <h3 style={{ marginBottom: "10px" }}>{item.product.id + " Name: " + item.product.name}</h3>
          <p style={{ height: "50px", overflow: "hidden", transition: "height 0.5s" }}>{item.product.description}</p>
          <p>Price: {item.product.price} USD</p>
          <p>Quantity: {item.quantity}</p>
          <input type="number" onChange={(event) => setOrderAmount(event.target.value)} />
          <p>{item.message}</p>
          <button type="button" onClick={() => submitOrder(item.product.id)}>Order</button>
        </div>
      ))}
    </div>
  );
});

export default OrderInventoryDisplay;
