import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import './ManagerPages.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory');
      setInventory(response.data);
    } catch (e) {
      toast.error("Failed to load inventory");
    }
    setLoading(false);
  };

  const updateInventory = async (productId, currentData) => {
    const qty = prompt("Enter new available quantity:", currentData.availableQuantity);
    if(qty !== null && !isNaN(qty)) {
      try {
        await api.put(`/inventory/${productId}`, {
          ...currentData,
          availableQuantity: parseInt(qty)
        });
        toast.success("Inventory updated");
        fetchData();
      } catch (e) {
        toast.error("Failed to update inventory");
      }
    }
  };

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1 className="manager-page-title">Inventory Control</h1>
      </div>
      
      {loading ? <div className="manager-empty">Loading...</div> : (
        <div className="manager-table-wrapper">
          <table className="manager-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Available Qty</th>
                <th>Reserved Qty</th>
                <th>Low Stock Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(inv => (
                <tr key={inv.id}>
                  <td style={{fontWeight: '700', color: '#2d3748'}}>{inv.product?.name || `Product ID: ${inv.productId}`}</td>
                  <td style={{fontWeight: '600', color: '#2d3748'}}>{inv.availableQuantity}</td>
                  <td style={{color: '#718096'}}>{inv.reservedQuantity}</td>
                  <td style={{color: '#718096'}}>{inv.lowStockThreshold}</td>
                  <td>
                    {inv.availableQuantity <= inv.lowStockThreshold ? (
                      <span className="status-inactive">Low Stock</span>
                    ) : (
                      <span className="status-active">Healthy</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => updateInventory(inv.productId, inv)} className="action-btn edit">Adjust Qty</button>
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

export default InventoryManagement;
