// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuditLogs from './pages/admin/AuditLogs';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ProductManagement from './pages/manager/ProductManagement';
import CategoryManagement from './pages/manager/CategoryManagement';
import InventoryManagement from './pages/manager/InventoryManagement';
import Returns from './pages/customer/Returns';
import Exchanges from './pages/customer/Exchanges';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProductCarousel from './components/ProductCarousel';
import Chatbot from './components/Chatbot';
import FAQ from './pages/customer/FAQ';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import './App.css';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">🌱 Loading...</div>;
  }

  return (
    <div className="app-container">
      <Toaster position="top-right" toastOptions={{ className: 'custom-toast' }} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-inner">
          <h1 className="brand">
            <Link to="/">
              <span className="brand-icon">🌿</span> <span className="glow-gold">S-Mart</span>
            </Link>
          </h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            {user ? (
              <>

                <Link to="/cart" className="nav-link">🛒 Cart</Link>
                <Link to="/returns" className="nav-link">↩️ Returns</Link>
                <Link to="/exchanges" className="nav-link">🔄 Exchanges</Link>
                <Link 
                  to={
                    user.roles?.includes('ROLE_ADMIN') ? '/admin/dashboard' :
                    user.roles?.includes('ROLE_MANAGER') ? '/manager/dashboard' :
                    user.roles?.includes('ROLE_STAFF') ? '/staff/dashboard' :
                    '/customer/dashboard'
                  }
                  className="user-greeting" 
                  style={{ color: user.roles?.includes('ROLE_ADMIN') ? '#FFD700' : undefined, fontWeight: user.roles?.includes('ROLE_ADMIN') ? 'bold' : 'normal' }}
                >
                  👤 {user.name}
                </Link>
                <button onClick={logout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link nav-login">Login</Link>
                <Link to="/register" className="nav-link nav-register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="hero-section">
              <div className="hero-badge">✦ Fresh & Organic ✦</div>
              <h2 className="hero-title">Welcome to <span className="glow-gold">S-Mart!</span></h2>
              <p className="hero-subtitle">
                Your smart grocery store & order management system —
                <span className="highlight"> fresh, fast, and reliable.</span>
              </p>
              {!user && (
                <div className="hero-actions">
                  <Link to="/login" className="btn-primary">
                    <span>🔐</span> Login
                  </Link>
                  <Link to="/register" className="btn-secondary">
                    <span>✨</span> Register
                  </Link>
                </div>
              )}
              {user && (
                <div className="hero-user-greeting">
                  <p>Welcome back, <strong>{user.name}</strong>! 🎉</p>
                  <span className="hero-role-badge">{user.roles?.join(', ')}</span>
                </div>
              )}
              <ProductCarousel />
              <div className="hero-features">
                <div className="feature-item">
                  <span className="feature-icon">🌾</span>
                  <span>Fresh Produce</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💚</span>
                  <span>Eco-Friendly</span>
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/products" element={<ProductManagement />} />
          <Route path="/manager/categories" element={<CategoryManagement />} />
          <Route path="/manager/inventory" element={<InventoryManagement />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/audit-logs" element={<AuditLogs />} />
          <Route path="/customer/dashboard/*" element={<CustomerDashboard />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Global Components */}
      <Chatbot />
    </div>
  );
}

export default App;
