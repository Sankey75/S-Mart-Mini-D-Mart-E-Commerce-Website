import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import { Link } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await orderService.getUserOrders();
        setOrders(userOrders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (loading) return <div className="loading-screen">Loading orders...</div>;

  return (
    <div className="cd-orders-view">
      <div className="cd-view-header">
        <h2 className="cd-view-title">My Orders</h2>
        <div className="cd-filters">
          {['ALL', 'PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map(f => (
            <button 
              key={f} 
              className={`cd-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'ALL' ? 'All Orders' : f}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="cd-empty-state">
          <span className="cd-empty-icon">📦</span>
          <h3>No orders found</h3>
          <p>You don't have any orders matching this status.</p>
          <Link to="/products" className="btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
        </div>
      ) : (
        <div className="cd-table-container">
          <table className="cd-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.orderItems?.length || 0} items</td>
                  <td>₹{order.totalAmount?.toFixed(2)}</td>
                  <td><span className={`cd-status-badge ${order.status?.toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    <button className="cd-action-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
