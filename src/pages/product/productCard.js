import React from 'react';
import './product.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-details">
                <div className="image-container">
                    <img src={product.url} alt={product.name} className="product-image" />
                </div>
                <h1>{product.name} {product.available ? <FaCheckCircle className="avail" /> : <FaTimesCircle className="unavail"/>}</h1>
                <h3>Product id: {product.id}</h3>
                <h4>Manufacturer: {product.manufacturer}</h4>
                <h5>Hover for more details</h5>
                <p>{product.description}</p>
                <p>Price: zl{product.price}</p>
                <p>Category: {product.categoryId}</p>
            </div>
        </div>
    );
};

export default ProductCard;
