import React, { useState, useEffect } from 'react';
import { exchangeService } from '../../services/exchangeService';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import toast from 'react-hot-toast';
import './Exchanges.css';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    orderId: '',
    productId: '',
    replacementProductId: '',
    quantity: 1,
    reason: 'Defective Product',
    description: ''
  });
  
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [exchangesData, ordersData, productsData] = await Promise.all([
        exchangeService.getUserExchanges(),
        orderService.getUserOrders(),
        productService.getAllProducts()
      ]);
      setExchanges(exchangesData);
      setAllProducts(productsData.filter(p => p.active));
      
      const eligibleOrders = ordersData.filter(o => 
        o.orderStatus === 'DELIVERED' || o.orderStatus === 'PICKED_UP'
      );
      setOrders(eligibleOrders);
    } catch (err) {
      console.error("Error fetching data", err);
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
    if (!formData.orderId || !formData.productId || !formData.replacementProductId) {
      toast.error('Please select an order, original product, and replacement product.');
      return;
    }
    try {
      await exchangeService.createExchangeRequest(formData);
      toast.success("Exchange request submitted successfully.");
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit exchange request.');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'REQUESTED': return 'status-requested';
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'PROCESSING': return 'status-received'; // Map to purple
      case 'COMPLETED': return 'status-completed';
      default: return 'status-default';
    }
  };

  return (
    <div className="exchanges-container">
      <div className="exchanges-header">
        <h2 className="exchanges-title">My Exchanges</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          Request Exchange
        </button>
      </div>

      {loading ? (
        <div className="exchanges-empty">Loading exchanges...</div>
      ) : exchanges.length === 0 ? (
        <div className="exchanges-empty">
          You have no exchange requests.
        </div>
      ) : (
        <div className="exchanges-table-wrapper">
          <table className="exchanges-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Original Item</th>
                <th>Replacement Item</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map(exc => (
                <tr key={exc.id}>
                  <td><strong>{exc.orderNumber}</strong></td>
                  <td style={{ color: '#e53e3e', fontWeight: '500' }}>{exc.productName}</td>
                  <td style={{ color: '#38a169', fontWeight: '500' }}>{exc.replacementProductName}</td>
                  <td>{exc.quantity}</td>
                  <td>
                    <span className={`exchanges-status ${getStatusClass(exc.status)}`}>
                      {exc.status}
                    </span>
                  </td>
                  <td>{new Date(exc.requestedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="exchanges-modal-overlay">
          <div className="exchanges-modal">
            <h3 className="exchanges-modal-title">Request an Exchange</h3>
            <form onSubmit={handleSubmit}>
              <div className="exchanges-form-group">
                <label>Select Order</label>
                <select 
                  className="exchanges-input" 
                  value={formData.orderId}
                  onChange={handleOrderChange}
                  required
                >
                  <option value="">-- Choose an eligible order --</option>
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>{o.orderNumber}</option>
                  ))}
                </select>
              </div>

              {selectedOrder && (
                <div className="exchanges-form-group">
                  <label>Original Product to Exchange</label>
                  <select 
                    className="exchanges-input"
                    value={formData.productId}
                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                    required
                  >
                    <option value="">-- Choose original product --</option>
                    {selectedOrder.items.map(item => (
                      <option key={item.productId} value={item.productId}>
                        {item.productName} (Ordered: {item.quantity})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="exchanges-form-group">
                <label>Replacement Product</label>
                <select 
                  className="exchanges-input"
                  value={formData.replacementProductId}
                  onChange={(e) => setFormData({...formData, replacementProductId: e.target.value})}
                  required
                >
                  <option value="">-- Choose replacement product --</option>
                  {allProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                  ))}
                </select>
              </div>

              <div className="exchanges-form-group">
                <label>Quantity</label>
                <input 
                  type="number" 
                  min="1" 
                  className="exchanges-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  required
                />
              </div>

              <div className="exchanges-form-group">
                <label>Reason</label>
                <select 
                  className="exchanges-input"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                >
                  <option value="Defective Product">Defective Product</option>
                  <option value="Wrong Item Received">Wrong Item Received</option>
                  <option value="Not as Described">Not as Described</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="exchanges-form-group">
                <label>Additional Details</label>
                <textarea 
                  className="exchanges-input"
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="exchanges-modal-actions">
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

export default Exchanges;
