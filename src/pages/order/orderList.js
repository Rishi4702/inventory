import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderList.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderList() {

	const ORDER_STATUS = ["AWAIT", "ACCEPTED", "SHIPPED", "DELIVERED", "CANCELED", "REJECTED"];

	const [products, setProducts] = useState([]);
	const [searchedProducts, setSearchedProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [checkboxSearch, setCheckboxSearch] = useState(false);

	useEffect(() => {
		getOrders();
		// const updateInterval = setInterval(() => {
		// 	console.log('Updated orders');
		// 	getOrders();
		// }, 4000);
		// return () => {
		// 	clearInterval(updateInterval);
		// };
	}, []);

	const getOrders = () => {
		const token = localStorage.getItem('accessToken');
		const payload = {};

		fetch('http://10.8.0.6:8080/order/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((data) => {
				var mergedOrders = data.orderedFromYourStorehouses.concat(data.orderedToYourStorehouses);
				mergedOrders = mergedOrders.map((obj) => ({ ...obj, tempStatus: obj.status }));
				mergedOrders.sort((a, b) => a.orderId - b.orderId);
				setProducts(mergedOrders);
				console.log(mergedOrders);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const processOrder = (orderId, orderStatus) => {
		const token = localStorage.getItem('accessToken');
		const payload = {
			orderId: orderId,
			orderStatus: orderStatus
		};

		axios.post('http://10.8.0.6:8080/order/process', payload, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
			.then((response) => {
				setProducts((prev) => {
					const updatedItems = prev.map((item) =>
						item.orderId === orderId ? { ...item, tempStatus: orderStatus, status: orderStatus } : item
					);
					return updatedItems;
				});
				console.log(response.data)
				if (response.data.message.includes('success')) {
					toast.success(response.data.message);
				} else {
					toast.info(response.data.message);
				}
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleOrderStatusSelectionChange = (event, orderId) => {
		setProducts((prev) => {
			const updatedItems = prev.map((item) =>
				item.orderId === orderId ? { ...item, tempStatus: event.target.value } : item
			);
			return updatedItems;
		});
	}

	const setSearchTermNewFunc = (event) => {
		setSearchTerm(event.target.value);
		var filteredProducts = [];
		if (!checkboxSearch) {
			filteredProducts = products.filter((product) => product.status.toLowerCase().includes(searchTerm.toLowerCase()));
		} else {
			const user = localStorage.getItem("name");
			filteredProducts = products.filter((product) =>
				product.status.toLowerCase().includes(searchTerm.toLowerCase()) && !product.userName.toLowerCase().includes(user.toLowerCase())
			);
		}
		setSearchedProducts(filteredProducts);
	}

	const handleCheckboxSearch = () => {
		setCheckboxSearch(!checkboxSearch);
		const user = localStorage.getItem("name");
		const filteredProducts = products.filter((product) => !product.userName.toLowerCase().includes(user.toLowerCase()));
		setSearchedProducts(filteredProducts);
	}

	return (
		<div className="outerdiv">
			<input
				type="text"
				placeholder="Search orders..."
				value={searchTerm}
				onChange={setSearchTermNewFunc}
			/>
			<label>
				<input type="checkbox" checked={checkboxSearch} onChange={handleCheckboxSearch}></input>
				Orders for Your warehouse
			</label>
			{(
				searchTerm === "" && checkboxSearch === false ? products : searchedProducts
			).map((order) => (
				<div key={order.orderId} className="order-list-box">
					<div><b>ID: </b>{order.orderId}</div>
					{/* <div><b>Status: </b>{order.status}</div> */}
					<select id="order-status-select"
						onChange={(e) => handleOrderStatusSelectionChange(e, order.orderId)}
						defaultValue={order.status}
						disabled={order.status === "CANCELED"}
					>
						{ORDER_STATUS.map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
					<div><b>Ordered By: </b>{order.userName}</div>
					<div><b>From Storehouse ID: </b>{order.formStorehouseId}</div>
					<div><b>To Storehouse ID: </b>{order.toStorehouseId}</div>
					<div className="order-details">
						<h3>Order Details :</h3>
						{order.items.map(item => (
							<div className="product-detail" key={item.productDto.id}>
								<b>Product Name: </b>{item.productDto.name}<br />
								<b>Description: </b>{item.productDto.description}<br />
								<b>Manufacturer: </b>{item.productDto.manufacturer}<br />
								<b>Quantity: </b>{item.quantity}
							</div>
						))}
					</div>
					{order.status !== "CANCELED" ?
						<button type="button" onClick={() => processOrder(order.orderId, order.tempStatus)} disabled={order.status === order.tempStatus}>Update</button>
						: null
					}
				</div>
			))}
			<ToastContainer />
		</div>
	);
}

export default OrderList;