import React, { useState, useEffect } from "react";
import InventoryDisplay from './inventoryDisplay';
import AddProduct from './AddProduct';

function WarehouseSelection() {

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    updateWarehouse();
  }, []);

  const updateSelectedWarehouse = () => {
    updateWarehouse();
  }

  const handleWarehouseChange = (event) => {
    const warehouseId = parseInt(event.target.value);
    setSelectedWarehouse(warehouseId);
  };

  const updateWarehouse = () => {
    // Get user ID and bearer token from local storage
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("accessToken");

    // Make request to API with bearer token and user ID
    fetch(`http://localhost:8080/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWarehouses(data.managedStorehouses);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '80px', width: '100%' }}>
      <div>
        <label htmlFor="warehouse-select" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
          <h1 style={{ display: 'inline-block', marginRight: '1rem' }}>Select a Warehouse:</h1>
        </label>
        {warehouses.length > 0 ? (
          <select
            id="warehouse-select"
            value={selectedWarehouse || ''}
            onChange={handleWarehouseChange}
            style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          >
            <option value={0}>Select a Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        ) : (
          <h2>{localStorage.getItem('name')} is not assigned to any warehouse.</h2>
        )}
        <InventoryDisplay selectedWarehouse={selectedWarehouse} key={selectedWarehouse} />
      </div>
      <AddProduct selectedWarehouse={selectedWarehouse} key={selectedWarehouse} notifyParent={updateSelectedWarehouse} />
    </div>
  );
}

export default WarehouseSelection;
