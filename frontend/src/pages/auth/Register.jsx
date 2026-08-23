import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'ROLE_CUSTOMER', adminSecret: '' });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Register for S-Mart</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required className="form-input" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required className="form-input" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required minLength={6} className="form-input" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone (Optional)</label>
            <input type="text" name="phone" className="form-input" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Register As</label>
            <select name="role" className="form-input" onChange={handleChange} value={formData.role || 'ROLE_CUSTOMER'}>
              <option value="ROLE_CUSTOMER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          
          {formData.role === 'ROLE_ADMIN' && (
            <div className="form-group">
              <label>Admin Secret Code</label>
              <input 
                type="password" 
                name="adminSecret" 
                required 
                className="form-input" 
                onChange={handleChange} 
                placeholder="Enter admin secret key"
              />
            </div>
          )}
          
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
