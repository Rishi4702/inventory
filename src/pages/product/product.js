 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import ProductCard from './productCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://10.8.0.6:8080/product/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="product-list-container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
