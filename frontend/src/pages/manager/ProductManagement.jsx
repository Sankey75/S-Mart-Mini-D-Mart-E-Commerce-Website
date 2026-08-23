import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import toast from 'react-hot-toast';
import './ManagerPages.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    sku: '',
    imageUrl: '',
    unit: '',
    active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const p = await productService.getAllProducts();
      const c = await categoryService.getAllCategories();
      setProducts(p);
      setCategories(c);
    } catch (e) {
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        toast.success("Product deleted");
        fetchData();
      } catch (e) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.categoryId || !newProduct.sku) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        category: { id: parseInt(newProduct.categoryId) }
      };
      await productService.createProduct(payload);
      toast.success("Product created successfully!");
      setShowModal(false);
      setNewProduct({
        name: '', description: '', price: '', categoryId: '', sku: '', imageUrl: '', unit: '', active: true
      });
      fetchData();
    } catch (e) {
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1 className="manager-page-title">Product Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>Add New Product</button>
      </div>
      
      {loading ? <div className="manager-empty">Loading...</div> : (
        <div className="manager-table-wrapper">
          <table className="manager-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name & SKU</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imageUrl || "https://via.placeholder.com/40"} alt={p.name} className="product-img-thumb" />
                  </td>
                  <td>
                    <div style={{fontWeight: '600', color: '#2d3748'}}>{p.name}</div>
                    <div style={{fontSize: '0.85rem', color: '#718096'}}>SKU: {p.sku}</div>
                  </td>
                  <td style={{fontWeight: '600'}}>₹{p.price}</td>
                  <td>{p.category?.name}</td>
                  <td>
                    <span className={p.active ? 'status-active' : 'status-inactive'}>
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '600px'}}>
            <h2 style={{fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)'}}>Add New Product</h2>
            <form onSubmit={handleCreateSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Name *</label>
                  <input type="text" className="form-input" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>SKU *</label>
                  <input type="text" className="form-input" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} required />
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Price *</label>
                  <input type="number" step="0.01" className="form-input" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Category *</label>
                  <select className="form-input" value={newProduct.categoryId} onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})} required>
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Unit</label>
                  <input type="text" className="form-input" value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} placeholder="e.g. kg, lb, piece" />
                </div>
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Image URL</label>
                <input type="url" className="form-input" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Description</label>
                <textarea className="form-input" rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <input type="checkbox" id="active" checked={newProduct.active} onChange={e => setNewProduct({...newProduct, active: e.target.checked})} />
                <label htmlFor="active" style={{fontWeight: '600'}}>Product is Active</label>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem'}}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
