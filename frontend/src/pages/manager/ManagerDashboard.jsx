import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  return (
    <div className="manager-dashboard">
      <div className="manager-header">
        <h1 className="manager-title">Manager Dashboard</h1>
        <p className="manager-subtitle">Manage products, categories, and inventory across the platform.</p>
      </div>
      
      <div className="manager-grid">
        <Link to="/manager/products" className="manager-card blue">
          <h3>Product Management</h3>
          <p>Create, update, and remove products from the catalog.</p>
        </Link>
        
        <Link to="/manager/categories" className="manager-card purple">
          <h3>Category Management</h3>
          <p>Organize your store by managing product categories.</p>
        </Link>
        
        <Link to="/manager/inventory" className="manager-card green">
          <h3>Inventory Control</h3>
          <p>Monitor stock levels, set thresholds, and adjust inventory.</p>
        </Link>
      </div>

      <div className="manager-staff-section">
        <h3>Staff Operations</h3>
        <p>As a Manager, you also have access to all staff-level fulfillment operations.</p>
        <Link to="/staff/dashboard" className="btn-primary">
          Go to Staff Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ManagerDashboard;
