import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  if (!cart) {
    return <div className="cart-empty" style={{padding: '2rem'}}>Loading your cart...</div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn-start-shopping">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
        <span className="cart-count">{cart.items.length} Items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items-section">
          {cart.items.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
          <div style={{marginTop: '1rem'}}>
            <button 
              onClick={clearCart}
              className="btn-clear"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span style={{fontWeight: '700'}}>₹{cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{color: 'var(--primary)', fontWeight: '600'}}>Calculated at Checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{cart.totalPrice.toFixed(2)}</span>
          </div>
          <Link 
            to="/checkout" 
            className="btn-checkout"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
