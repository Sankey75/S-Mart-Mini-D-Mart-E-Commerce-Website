import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="order-success-container">
      <div className="order-success-icon-wrapper">
        <svg className="order-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 className="order-success-title">Order Successfully Placed!</h2>
      <p className="order-success-message">Thank you for shopping with S-Mart.</p>
      
      {orderNumber && (
        <div className="order-success-details">
          <p className="order-success-label">Your Order Number:</p>
          <p className="order-success-number">{orderNumber}</p>
        </div>
      )}
      
      <div className="order-success-actions">
        <Link to="/products" className="order-success-btn-primary">
          Continue Shopping
        </Link>
        <Link to="/" className="order-success-btn-secondary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
