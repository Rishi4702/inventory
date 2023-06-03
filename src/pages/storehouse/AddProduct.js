import React, { useState, useEffect } from "react";
import axios from "axios";
import './addProduct.css';

function AddProduct(props) {

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [formQuantity, setFormQuantity] = useState(0);

	//   const filteredProducts = products.filter((product) =>
	//   typeof searchTerm === 'string' && product.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const addProductToWarehouse = (product) => {
		console.log(`Adding product ID[${product.id}] to warehouse ID[${props.selectedWarehouse}] with quantity [${formQuantity}]`);
		axios.post("http://192.168.43.148:8080/storehouse/product/add", {
			storehouseId: props.selectedWarehouse,
			productId: product.id,
			quantity: formQuantity
		})
			.then((response) => {
				console.log(response.data);
				props.notifyParent();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const searchForProduct = () => {
		axios.get(`http://192.168.43.148:8080/product/name/${searchTerm}`)
			.then((response) => {
				console.log(response);
				setProducts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const onAddProdQuantityChange = (event) => {
		setFormQuantity(event.target.value);
	}

	const setSearchTermNewFunc = (event) => {
		setSearchTerm(event.target.value);
	}

	console.log(filteredProducts)

	return (
		<div className="outerdiv">
			<div className="innerDiv">
			<div className="search-input">
				<input
					type="text"
					placeholder="Search products..."
					value={searchTerm}
					onChange={setSearchTermNewFunc}
				/>
			</div>
			<div className="search-button">
				<button type="button" onClick={searchForProduct}>
					Search
				</button>
			</div>
			</div>
			
			{filteredProducts.map((product) => (
				<div key={product.id} className="add-product-box">
					<div><b>ID </b>{product.id}</div>
					<div><b>Name </b>{product.name}</div>
					<div><b>Price </b>{product.price}</div>
					<div><b>Manuf. </b>{product.manufacturer}</div>
					<div><b>Availb. </b>{product.available.toString()}</div>
					<input type="number" name="addProdQuantity" value={formQuantity} onChange={onAddProdQuantityChange} />
					<button type="button"
						onClick={() => addProductToWarehouse(product)}
						disabled={props.selectedWarehouse === null}>
						Add
					</button>
				</div>
			))}
		</div>
	);
}

export default AddProduct;