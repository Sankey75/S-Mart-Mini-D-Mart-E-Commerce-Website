import React, { useState } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './CustomerDashboard.css';

// Import sub-views (we will create these next)
import DashboardHome from './DashboardHome';
import MyOrders from './MyOrders';
import MyProfile from './MyProfile';
import MockView from './MockView';

function CustomerDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not logged in, should theoretically redirect, but App.jsx handles that mostly.
  if (!user) {
    return <div className="loading-screen">Please login to access the dashboard.</div>;
  }

  const navItems = [
    { path: '', label: '🏠 Dashboard' },
    { path: 'products', label: '🛒 All Products', isExternal: true },
    { path: 'categories', label: '🛒 Categories', isExternal: true },
    { path: 'cart', label: '🛍️ My Cart', isExternal: true },
    { path: 'orders', label: '📦 My Orders' },
    { path: 'wishlist', label: '❤️ Wishlist' },
    { path: 'addresses', label: '📍 My Addresses' },
    { path: 'profile', label: '👤 My Profile' },
    { path: 'payments', label: '💳 Payments' },
    { path: 'coupons', label: '🎟️ Coupons' },
    { path: 'notifications', label: '🔔 Notifications' },
    { path: 'reviews', label: '⭐ My Reviews' },
    { path: 'support', label: '❓ Help & Support' },
    { path: 'settings', label: '⚙️ Settings' }
  ];

  const handleNavClick = (path, isExternal) => {
    setMobileMenuOpen(false);
    if (isExternal) {
      navigate('/' + path);
    } else {
      navigate('/customer/dashboard/' + path);
    }
  };

  const currentPath = location.pathname.replace('/customer/dashboard', '').replace('/', '');

  return (
    <div className="customer-dashboard-layout">
      {/* Mobile Header for Hamburger */}
      <div className="cd-mobile-header">
        <h2>S-Mart Portal</h2>
        <button className="cd-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`cd-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="cd-sidebar-header">
          <h3>Customer Portal</h3>
        </div>
        <nav className="cd-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path, item.isExternal)}
              className={`cd-nav-item ${(currentPath === item.path && !item.isExternal) ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/'); }} className="cd-nav-item logout">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="cd-main-content">
        <div className="cd-topbar">
          <div className="cd-topbar-search">
            <input type="text" placeholder="Search products..." />
          </div>
          <div className="cd-topbar-actions">
            <span className="cd-icon">🔔</span>
            <span className="cd-icon">🛒</span>
            <div className="cd-profile">
              <span className="cd-avatar">👤</span>
              <span className="cd-name">{user.name}</span>
            </div>
          </div>
        </div>

        <div className="cd-content-area">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/wishlist" element={<MockView title="Wishlist" emptyMessage="Your wishlist is empty" />} />
            <Route path="/addresses" element={<MockView title="My Addresses" emptyMessage="No saved addresses" />} />
            <Route path="/payments" element={<MockView title="Payments" emptyMessage="No payment methods saved" />} />
            <Route path="/coupons" element={<MockView title="Coupons & Offers" emptyMessage="No active coupons" />} />
            <Route path="/notifications" element={<MockView title="Notifications" emptyMessage="No notifications" />} />
            <Route path="/reviews" element={<MockView title="My Reviews" emptyMessage="You haven't reviewed any products yet" />} />
            <Route path="/support" element={<MockView title="Help & Support" emptyMessage="How can we help you today?" />} />
            <Route path="/settings" element={<MockView title="Settings" emptyMessage="Manage your preferences here" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
