import React, { useState, useEffect } from 'react';
import { returnService } from '../../services/returnService';
import './StaffManagement.css';

const ReturnManagement = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const data = await returnService.getAllReturns();
      setReturns(data);
    } catch (error) {
      console.error("Error fetching returns", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleStatusChange = async (returnId, newStatus) => {
    try {
      await returnService.updateReturnStatus(returnId, newStatus);
      fetchReturns();
    } catch (error) {
      console.error("Error updating return status", error);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'REQUESTED': return 'status-yellow';
      case 'APPROVED': return 'status-blue';
      case 'REJECTED': return 'status-red';
      case 'RECEIVED': return 'status-purple';
      case 'REFUNDED':
      case 'COMPLETED': return 'status-green';
      default: return 'status-default';
    }
  };

  return (
    <div className="staff-management-container">
      <div className="staff-management-header">
        <h2 className="staff-management-title">Return Management</h2>
      </div>

      {loading ? (
        <div className="staff-management-empty">Loading returns...</div>
      ) : returns.length === 0 ? (
        <div className="staff-management-empty">No return requests found.</div>
      ) : (
        <div className="staff-management-table-wrapper">
          <table className="staff-management-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {returns.map(ret => (
                <tr key={ret.id}>
                  <td><strong>{ret.orderNumber}</strong></td>
                  <td>{ret.productName}</td>
                  <td>{ret.quantity}</td>
                  <td>
                    <div>{ret.reason}</div>
                    <div style={{fontSize: '0.8rem', color: '#718096', marginTop: '4px'}}>{ret.description}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(ret.status)}`}>
                      {ret.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="action-select"
                      value={ret.status}
                      onChange={(e) => handleStatusChange(ret.id, e.target.value)}
                    >
                      <option value="REQUESTED">Requested</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="RECEIVED">Received</option>
                      <option value="COMPLETED">Completed</option>
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

export default ReturnManagement;
