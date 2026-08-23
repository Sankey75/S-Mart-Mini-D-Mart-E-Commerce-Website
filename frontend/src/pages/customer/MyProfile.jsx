import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

function MyProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Mock save
    toast.success('Profile updated successfully!');
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    // Mock password change
    toast.success('Password changed successfully!');
    setFormData({ ...formData, currentPassword: '', newPassword: '' });
  };

  return (
    <div className="cd-profile-view">
      <h2 className="cd-view-title">My Profile</h2>
      
      <div className="cd-grid-2">
        <div className="cd-card">
          <h3 className="cd-card-title">Personal Information</h3>
          <form onSubmit={handleProfileSave} className="cd-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />
              <small>Email address cannot be changed.</small>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>

        <div className="cd-card">
          <h3 className="cd-card-title">Change Password</h3>
          <form onSubmit={handlePasswordSave} className="cd-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required minLength={6} />
            </div>
            <button type="submit" className="btn-secondary">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
