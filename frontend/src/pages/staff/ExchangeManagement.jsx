import React, { useState, useEffect } from 'react';
import { exchangeService } from '../../services/exchangeService';
import toast from 'react-hot-toast';
import './StaffManagement.css';

const ExchangeManagement = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExchanges = async () => {
    setLoading(true);
    try {
      const data = await exchangeService.getAllExchanges();
      setExchanges(data);
    } catch (error) {
      console.error("Error fetching exchanges", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const handleStatusChange = async (exchangeId, newStatus) => {
    try {
      await exchangeService.updateExchangeStatus(exchangeId, newStatus);
      toast.success("Exchange status updated!");
      fetchExchanges();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'REQUESTED': return 'status-yellow';
      case 'APPROVED': return 'status-blue';
      case 'REJECTED': return 'status-red';
      case 'PROCESSING': return 'status-purple';
      case 'COMPLETED': return 'status-green';
      default: return 'status-default';
    }
  };

  return (
    <div className="staff-management-container">
      <div className="staff-management-header">
        <h2 className="staff-management-title">Exchanges Management</h2>
      </div>

      {loading ? (
        <div className="staff-management-empty">Loading exchanges...</div>
      ) : exchanges.length === 0 ? (
        <div className="staff-management-empty">No exchange requests found.</div>
      ) : (
        <div className="staff-management-table-wrapper">
          <table className="staff-management-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Original Item</th>
                <th>Replacement Item</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map(exc => (
                <tr key={exc.id}>
                  <td><strong>{exc.orderNumber}</strong></td>
                  <td style={{ color: '#e53e3e', fontWeight: '500' }}>{exc.productName} (x{exc.quantity})</td>
                  <td style={{ color: '#38a169', fontWeight: '500' }}>{exc.replacementProductName} (x{exc.quantity})</td>
                  <td>
                    <div>{exc.reason}</div>
                    <div style={{fontSize: '0.8rem', color: '#718096', marginTop: '4px'}}>{exc.description}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(exc.status)}`}>
                      {exc.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="action-select"
                      value={exc.status}
                      onChange={(e) => handleStatusChange(exc.id, e.target.value)}
                    >
                      <option value="REQUESTED">Requested</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="PROCESSING">Processing</option>
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

export default ExchangeManagement;
