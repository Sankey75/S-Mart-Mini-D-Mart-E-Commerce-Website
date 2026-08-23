import React, { useState, useEffect } from 'react';
import { returnService } from '../../services/returnService';
import { orderService } from '../../services/orderService';
import './Returns.css';

const Returns = () => {
  const [returns, setReturns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    orderId: '',
    productId: '',
    quantity: 1,
    reason: 'Defective Product',
    description: ''
  });
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [returnsData, ordersData] = await Promise.all([
        returnService.getUserReturns(),
        orderService.getUserOrders()
      ]);
      setReturns(returnsData);
      
      // Filter out orders that are not DELIVERED or PICKED_UP
      const eligibleOrders = ordersData.filter(o => 
        o.orderStatus === 'DELIVERED' || o.orderStatus === 'PICKED_UP'
      );
      setOrders(eligibleOrders);
    } catch (err) {
      console.error("Error fetching returns data", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderChange = (e) => {
    const oId = e.target.value;
    setFormData({ ...formData, orderId: oId, productId: '' });
    if (oId) {
      const order = orders.find(o => o.id.toString() === oId);
      setSelectedOrder(order);
    } else {
      setSelectedOrder(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.orderId || !formData.productId) {
      setError('Please select an order and a product.');
      return;
    }
    try {
      await returnService.createReturnRequest(formData);
      setShowModal(false);
      fetchData(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit return request.');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'REQUESTED': return 'status-requested';
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'RECEIVED': return 'status-received';
      case 'COMPLETED': return 'status-completed';
      default: return 'status-default';
    }
  };

  return (
    <div className="returns-container">
      <div className="returns-header">
        <h2 className="returns-title">My Returns & Exchanges</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          Request Return
        </button>
      </div>

      {loading ? (
        <div className="returns-empty">Loading returns...</div>
      ) : returns.length === 0 ? (
        <div className="returns-empty">
          You have no return requests.
        </div>
      ) : (
        <div className="returns-table-wrapper">
          <table className="returns-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {returns.map(ret => (
                <tr key={ret.id}>
                  <td><strong>{ret.orderNumber}</strong></td>
                  <td>{ret.productName}</td>
                  <td>{ret.quantity}</td>
                  <td>{ret.reason}</td>
                  <td>
                    <span className={`returns-status ${getStatusClass(ret.status)}`}>
                      {ret.status}
                    </span>
                  </td>
                  <td>{new Date(ret.requestedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Return Request Modal */}
      {showModal && (
        <div className="returns-modal-overlay">
          <div className="returns-modal">
            <h3 className="returns-modal-title">Request a Return</h3>
            {error && <div className="checkout-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="returns-form-group">
                <label>Select Order</label>
                <select 
                  className="returns-input" 
                  value={formData.orderId}
                  onChange={handleOrderChange}
                  required
                >
                  <option value="">-- Choose an eligible order --</option>
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>{o.orderNumber} (Delivered on {new Date(o.createdAt).toLocaleDateString()})</option>
                  ))}
                </select>
              </div>

              {selectedOrder && (
                <div className="returns-form-group">
                  <label>Select Product</label>
                  <select 
                    className="returns-input"
                    value={formData.productId}
                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                    required
                  >
                    <option value="">-- Choose a product --</option>
                    {selectedOrder.items.map(item => (
                      <option key={item.productId} value={item.productId}>
                        {item.productName} (Max Qty: {item.quantity})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="returns-form-group">
                <label>Quantity</label>
                <input 
                  type="number" 
                  min="1" 
                  className="returns-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  required
                />
              </div>

              <div className="returns-form-group">
                <label>Reason</label>
                <select 
                  className="returns-input"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                >
                  <option value="Defective Product">Defective Product</option>
                  <option value="Wrong Item Received">Wrong Item Received</option>
                  <option value="Item Damaged During Delivery">Item Damaged During Delivery</option>
                  <option value="Not as Described">Not as Described</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="returns-form-group">
                <label>Additional Details</label>
                <textarea 
                  className="returns-input"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="returns-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Returns;
