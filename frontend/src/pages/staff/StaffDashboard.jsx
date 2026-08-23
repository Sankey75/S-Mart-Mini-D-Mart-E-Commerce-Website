import React from 'react';
import OrderManagement from './OrderManagement';
import ReturnManagement from './ReturnManagement';
import ExchangeManagement from './ExchangeManagement';
import './StaffDashboard.css';

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard">
      <h1 className="staff-dashboard-title">Staff Dashboard</h1>
      <p className="staff-dashboard-subtitle">Manage orders, returns, exchanges, and store fulfillment.</p>
      
      <OrderManagement />
      <ReturnManagement />
      <ExchangeManagement />
    </div>
  );
};

export default StaffDashboard;
