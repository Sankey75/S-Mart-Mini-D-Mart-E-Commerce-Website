import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { orderService } from '../../services/orderService';
import { Link } from 'react-router-dom';

function DashboardHome() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userOrders = await orderService.getUserOrders();
        setOrders(userOrders || []);
      } catch (err) {
        console.error("Failed to load orders for dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading-screen">Loading dashboard...</div>;

  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  return (
    <div className="cd-home">
      <div className="cd-welcome-section">
        <h2>Welcome back, {user?.name}! 🌿</h2>
        <p>Fresh groceries, fast delivery, and great deals are just a click away.</p>
      </div>

      <div className="cd-summary-cards">
        <div className="cd-card">
          <div className="cd-card-icon">📦</div>
          <div className="cd-card-info">
            <h4>Total Orders</h4>
            <span className="cd-card-value">{orders.length}</span>
          </div>
        </div>
        <div className="cd-card">
          <div className="cd-card-icon">🚚</div>
          <div className="cd-card-info">
            <h4>Active Orders</h4>
            <span className="cd-card-value">{activeOrders.length}</span>
          </div>
        </div>
        <div className="cd-card">
          <div className="cd-card-icon">❤️</div>
          <div className="cd-card-info">
            <h4>Wishlist</h4>
            <span className="cd-card-value">0</span>
          </div>
        </div>
        <div className="cd-card">
          <div className="cd-card-icon">🎟️</div>
          <div className="cd-card-info">
            <h4>Coupons</h4>
            <span className="cd-card-value">2</span>
          </div>
        </div>
      </div>

      {activeOrders.length > 0 && (
        <div className="cd-active-order-section">
          <h3 className="cd-section-title">Active Order Tracking</h3>
          <div className="cd-tracking-card">
            <div className="cd-tracking-header">
              <h4>Order #{activeOrders[0].id}</h4>
              <span className="cd-status-badge in-progress">{activeOrders[0].status}</span>
            </div>
            <div className="cd-tracking-progress">
              <span>Placed</span>
              <span>→</span>
              <span>Processing</span>
              <span>→</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Out for Delivery</span>
              <span>→</span>
              <span>Delivered</span>
            </div>
            <p><strong>Total:</strong> ₹{activeOrders[0].totalAmount?.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="cd-recent-orders-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="cd-section-title" style={{ marginBottom: 0 }}>Recent Orders</h3>
          <Link to="/customer/dashboard/orders" className="cd-view-all">View All Orders</Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="cd-empty-state">
            <span className="cd-empty-icon">🛒</span>
            <h4>No orders yet</h4>
            <p>Start shopping to see your orders here.</p>
            <Link to="/products" className="btn-primary" style={{ marginTop: '1rem' }}>Shop Now</Link>
          </div>
        ) : (
          <div className="cd-table-container">
            <table className="cd-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 3).map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>₹{order.totalAmount?.toFixed(2)}</td>
                    <td><span className={`cd-status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;
