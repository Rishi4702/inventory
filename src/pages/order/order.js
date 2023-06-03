import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderInventoryDisplay from './orderInventoryDisplay';
import OrderList from "./orderList";

function Order() {

	const [warehouses, setWarehouses] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const childRef = useRef(null);

	useEffect(() => {
		updateWarehouse();
	}, []);

	const handleWarehouseChange = (event) => {
		const warehouseId = parseInt(event.target.value);
		setSelectedWarehouse(warehouseId);
	};

	const updateWarehouse = async () => {
		// Get managinig storehouse
		const token = localStorage.getItem('accessToken');
		const storeHouseData = await axios.get('http://192.168.43.148:8080/users/storehouses', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).catch((error) => {
			console.log(error);
		});

		// Make request to API with bearer token and user ID
		axios.get('http://192.168.43.148:8080/storehouse/all')
			.then((response) => {
				const managingStorehouseId = storeHouseData.data[0].id;
				const filteredHouses = response.data.filter((house) => house.id !== managingStorehouseId);
				setWarehouses(filteredHouses);
			})
			.catch((error) => {
				console.log(error);
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
				<OrderInventoryDisplay selectedWarehouse={selectedWarehouse} key={selectedWarehouse} ref={childRef} />
			</div>
			<OrderList></OrderList>
		</div>
	);
}

export default Order;
