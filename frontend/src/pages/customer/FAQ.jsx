import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-content">
        <div className="faq-item">
          <h3>How do I track my order?</h3>
          <p>You can track your order by clicking on the "Track Order" link in the footer or visiting your Customer Dashboard.</p>
        </div>
        <div className="faq-item">
          <h3>What is your return policy?</h3>
          <p>We accept returns within 7 days of delivery for fresh produce and 15 days for non-perishable items.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer free delivery?</h3>
          <p>Yes, we offer free delivery on all orders above ₹500.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
