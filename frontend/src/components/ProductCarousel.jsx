import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from './ProductCard';
import '../pages/customer/Products.css'; // Ensure product card styles are loaded
import './ProductCarousel.css';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data.slice(0, 10)); // Take first 10 for carousel
    } catch (error) {
      console.error("Failed to load carousel products", error);
    }
    setLoading(false);
  };

  if (loading || !products || products.length === 0) return null;

  return (
    <div className="product-carousel-container">
      <h3 className="carousel-title">Featured Products</h3>
      <div className="carousel-track-wrapper">
        <div className="carousel-track">
          {[...products, ...products].map((product, i) => (
            <div key={`${product.id}-${i}`} className="carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
