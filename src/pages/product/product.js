import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import ProductCard from './productCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.43.148:8080/product/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    available: true,
    url:'',
    manufacturer: ''
  });
  
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://192.168.43.148:8080/product/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <div className="product_outer">
      <div className="product-list-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>
        <form className="product_form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={product.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={product.description} onChange={handleChange} />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={product.price} onChange={handleChange} />
          </label>
          <label>
            Manufacturer:
            <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleChange} />
          </label>
          <label>
          Category Id:
          <input type="number" name="categoryId" value={product.categoryId} onChange={handleChange} />
        </label>
        <label>
          Url:
          <input type="text" name="url" value={product.url} onChange={handleChange} />
        </label>
          <label>
            Available:
            <select name="available" value={product.available} onChange={handleChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label>
          <input type="submit" value="Add Product" />
        </form>
      </div>
    </div>
  );
};

export default ProductList;
