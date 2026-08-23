import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fulfillmentType: 'STORE_PICKUP',
    scheduledDate: '',
    scheduledTime: '',
    addressId: 1
  });
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const deliveryFee = formData.fulfillmentType === 'HOME_DELIVERY' ? 5.00 : 0.00;
  const total = cart.totalPrice + deliveryFee;

  const initiateRazorpay = async () => {
    if (!razorpayLoaded) {
      toast.error('Payment gateway is loading, please wait...');
      return;
    }

    setLoading(true);
    let razorpayOrder;
    try {
      razorpayOrder = await orderService.createRazorpayOrder(total);
    } catch (err) {
      toast.error('Failed to initialize payment');
      setLoading(false);
      return;
    }

    const options = {
      key: razorpayOrder.keyId,
      amount: razorpayOrder.amount, // Razorpay expects amount in paise
      currency: razorpayOrder.currency,
      name: 'S-Mart',
      description: `Order Payment - ${cart.items.length} items`,
      image: '/src/assets/HOME.png',
      order_id: razorpayOrder.orderId,
      handler: async function (response) {
        // Payment successful — place the order
        try {
          setLoading(true);
          const order = await orderService.createOrder({
            ...formData,
            paymentId: response.razorpay_payment_id,
            paymentMethod: 'RAZORPAY',
          });
          await fetchCart();
          toast.success('Payment successful! Order placed.');
          navigate(`/order-success?orderId=${order.id}&orderNumber=${order.orderNumber}`);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to place order after payment');
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: address.fullName || user?.name || '',
        email: user?.email || '',
        contact: address.phone || '',
      },
      notes: {
        address: `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`,
      },
      theme: {
        color: '#2E7D32',
      },
      modal: {
        ondismiss: function () {
          toast.error('Payment cancelled');
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate address for home delivery
    if (formData.fulfillmentType === 'HOME_DELIVERY') {
      if (!address.addressLine1 || !address.city || !address.state || !address.pincode || !address.phone) {
        setError('Please fill in all required address fields for home delivery.');
        return;
      }
    }

    if (paymentMethod === 'RAZORPAY') {
      initiateRazorpay();
    } else {
      // Cash on Delivery
      setLoading(true);
      try {
        const order = await orderService.createOrder({
          ...formData,
          paymentMethod: 'COD',
        });
        await fetchCart();
        toast.success('Order placed successfully!');
        navigate(`/order-success?orderId=${order.id}&orderNumber=${order.orderNumber}`);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to place order');
      }
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      
      {error && <div className="checkout-error">{error}</div>}

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {/* Fulfillment Details */}
            <div className="checkout-card">
              <h3 className="checkout-card-title">📦 Fulfillment Details</h3>
              
              <div className="checkout-form-group">
                <label>Type</label>
                <select 
                  name="fulfillmentType" 
                  value={formData.fulfillmentType} 
                  onChange={handleChange}
                  className="checkout-input"
                >
                  <option value="STORE_PICKUP">Store Pickup (Free)</option>
                  <option value="HOME_DELIVERY">Home Delivery (₹5.00)</option>
                </select>
              </div>
              
              <div className="checkout-form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  name="scheduledDate" 
                  required 
                  value={formData.scheduledDate} 
                  onChange={handleChange}
                  className="checkout-input"
                />
              </div>
              
              <div className="checkout-form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  name="scheduledTime" 
                  required 
                  value={formData.scheduledTime} 
                  onChange={handleChange}
                  className="checkout-input"
                />
              </div>
            </div>

            {/* Delivery Address — only show for Home Delivery */}
            {formData.fulfillmentType === 'HOME_DELIVERY' && (
              <div className="checkout-card">
                <h3 className="checkout-card-title">📍 Delivery Address</h3>
                
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" name="fullName" required
                      value={address.fullName} onChange={handleAddressChange}
                      className="checkout-input" placeholder="Your full name"
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" name="phone" required
                      value={address.phone} onChange={handleAddressChange}
                      className="checkout-input" placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
                
                <div className="checkout-form-group">
                  <label>Address Line 1 *</label>
                  <input 
                    type="text" name="addressLine1" required
                    value={address.addressLine1} onChange={handleAddressChange}
                    className="checkout-input" placeholder="House/Flat No., Street, Area"
                  />
                </div>
                
                <div className="checkout-form-group">
                  <label>Address Line 2</label>
                  <input 
                    type="text" name="addressLine2"
                    value={address.addressLine2} onChange={handleAddressChange}
                    className="checkout-input" placeholder="Landmark (optional)"
                  />
                </div>
                
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>City *</label>
                    <input 
                      type="text" name="city" required
                      value={address.city} onChange={handleAddressChange}
                      className="checkout-input" placeholder="City"
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label>State *</label>
                    <input 
                      type="text" name="state" required
                      value={address.state} onChange={handleAddressChange}
                      className="checkout-input" placeholder="State"
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label>Pincode *</label>
                    <input 
                      type="text" name="pincode" required
                      value={address.pincode} onChange={handleAddressChange}
                      className="checkout-input" placeholder="6-digit pincode"
                      maxLength="6" pattern="[0-9]{6}"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Method */}
            <div className="checkout-card">
              <h3 className="checkout-card-title">💳 Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'RAZORPAY' ? 'selected' : ''}`}>
                  <input 
                    type="radio" name="paymentMethod" value="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-icon">🏦</span>
                    <div>
                      <strong>Razorpay</strong>
                      <small>UPI, Cards, Net Banking, Wallets</small>
                    </div>
                  </div>
                </label>
                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" name="paymentMethod" value="COD"
                    checked={paymentMethod === 'COD'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-icon">💵</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <small>Pay when you receive the order</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="checkout-submit-btn"
            >
              {loading ? 'Processing...' : paymentMethod === 'RAZORPAY' ? `Pay ₹${total.toFixed(2)} with Razorpay` : `Place Order (₹${total.toFixed(2)}) — COD`}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3 className="checkout-summary-title">Order Summary</h3>
          <div className="checkout-summary-items">
            {cart.items.map(item => (
              <div key={item.productId} className="checkout-summary-item">
                <span className="checkout-summary-item-name">{item.quantity}x {item.productName}</span>
                <span>₹{item.subTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="checkout-summary-totals">
            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>₹{cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="checkout-summary-total-row">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
