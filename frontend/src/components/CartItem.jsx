import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity } = useContext(CartContext);

  return (
    <div className="cart-item-card">
      {item.productImageUrl ? (
        <img src={item.productImageUrl} alt={item.productName} className="cart-item-image" />
      ) : (
        <div className="cart-item-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>
          No Img
        </div>
      )}
      
      <div className="cart-item-info">
        <Link to={`/products/${item.productId}`} className="cart-item-name hover:underline block">{item.productName}</Link>
        <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
      </div>
      
      <div className="quantity-controls">
        <button 
          className="btn-qty"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
        >-</button>
        <span className="qty-display">{item.quantity}</span>
        <button 
          className="btn-qty"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
        >+</button>
      </div>
      
      <div style={{fontWeight: '800', fontSize: '1.2rem', minWidth: '80px', textAlign: 'right', color: 'var(--primary-dark)'}}>
        ₹{item.subTotal.toFixed(2)}
      </div>
      
      <button 
        className="btn-remove"
        onClick={() => updateQuantity(item.productId, 0)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
