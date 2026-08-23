import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subtitle">Welcome to the Administration Panel. Select a module below to manage the platform.</p>
      </div>
      
      <div className="admin-grid">
        <Link to="/manager/dashboard" className="admin-card">
          <span className="admin-card-icon">📊</span>
          <h3>Manager Dashboard</h3>
          <p>Access the full manager dashboard to manage products, categories, and inventory.</p>
        </Link>
        
        <Link to="/manager/products" className="admin-card" style={{borderColor: 'var(--primary)'}}>
          <span className="admin-card-icon">🛍️</span>
          <h3>Product Management</h3>
          <p>Direct access to add, edit, or remove products from the store.</p>
        </Link>

        <Link to="/admin/audit-logs" className="admin-card danger">
          <span className="admin-card-icon">🛡️</span>
          <h3>System Audit Logs</h3>
          <p>View detailed audit logs for critical system actions and modifications.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
