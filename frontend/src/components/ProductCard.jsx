import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    setAdding(true);
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      // Error already handled by CartContext
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      ) : (
        <div className="product-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          No Image
        </div>
      )}
      <div className="product-info">
        <span className="product-category">{product.category?.name || 'General'}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toFixed(2)} <span style={{fontSize: '0.8rem', color: '#999'}}>/{product.unit}</span></p>
        
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn-view">
            View Details
          </Link>
          <button 
            className="btn-add-cart" 
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? '...' : '🛒 Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
