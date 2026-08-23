import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import toast from 'react-hot-toast';
import './ManagerPages.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const c = await categoryService.getAllCategories();
      setCategories(c);
    } catch (e) {
      toast.error("Failed to load categories");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this category? Products might be affected.")) {
      try {
        await categoryService.deleteCategory(id);
        toast.success("Category deleted");
        fetchData();
      } catch (e) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1 className="manager-page-title">Category Management</h1>
        <button className="btn-primary">Add Category</button>
      </div>
      
      {loading ? <div className="manager-empty">Loading...</div> : (
        <div className="manager-table-wrapper">
          <table className="manager-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td style={{color: '#718096'}}>{c.id}</td>
                  <td style={{fontWeight: '700', color: '#2d3748'}}>{c.name}</td>
                  <td style={{color: '#4a5568'}}>{c.description}</td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button onClick={() => handleDelete(c.id)} className="action-btn delete">Delete</button>
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

export default CategoryManagement;
