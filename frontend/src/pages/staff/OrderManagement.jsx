import React, { useState, useEffect } from 'react';
import { fulfillmentService } from '../../services/fulfillmentService';
import './StaffManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchOrders = async (statusFilter = '') => {
    setLoading(true);
    try {
      const data = await fulfillmentService.getAllOrders(statusFilter);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(filter);
  }, [filter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fulfillmentService.updateOrderStatus(orderId, newStatus);
      fetchOrders(filter); // Refresh list
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'PLACED': return 'status-blue';
      case 'PREPARING': return 'status-yellow';
      case 'READY_FOR_PICKUP': return 'status-purple';
      case 'OUT_FOR_DELIVERY': return 'status-orange';
      case 'DELIVERED': 
      case 'COMPLETED': return 'status-green';
      case 'CANCELLED': return 'status-red';
      default: return 'status-default';
    }
  };

  return (
    <div className="staff-management-container">
      <div className="staff-management-header">
        <h2 className="staff-management-title">Order Management</h2>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="staff-management-select"
        >
          <option value="">All Orders</option>
          <option value="PLACED">Placed</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY_FOR_PICKUP">Ready for Pickup</option>
          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
        </select>
      </div>

      {loading ? (
        <div className="staff-management-empty">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="staff-management-empty">No orders found.</div>
      ) : (
        <div className="staff-management-table-wrapper">
          <table className="staff-management-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.orderNumber}</strong></td>
                  <td>{order.fulfillmentType}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><strong>₹{order.totalAmount.toFixed(2)}</strong></td>
                  <td>
                    <select 
                      className="action-select"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="PLACED">Placed</option>
                      <option value="PREPARING">Preparing</option>
                      <option value="READY_FOR_PICKUP">Ready for Pickup</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
