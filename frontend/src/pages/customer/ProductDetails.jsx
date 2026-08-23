import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { inventoryService } from '../../services/inventoryService';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = React.useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
    } catch (err) {
      // Error handled by CartContext
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        
        try {
            const invData = await inventoryService.getInventoryByProductId(id);
            setInventory(invData);
        } catch (invErr) {
            console.error("No inventory info available", invErr);
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  const availableStock = inventory ? inventory.availableQuantity : 0;
  const isOutOfStock = availableStock <= 0;

  return (
    <div className="details-container">
      <div className="details-image-wrapper">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="details-image" />
        ) : (
          <span style={{color: '#999', fontSize: '1.2rem'}}>No Image</span>
        )}
      </div>
      
      <div className="details-info">
        <h2 className="details-title">{product.name}</h2>
        
        <div className="details-category">
          {product.category?.name}
        </div>
        
        <p className="details-description">{product.description}</p>
        
        <div className="details-price-wrapper">
          <span className="details-price">₹{product.price.toFixed(2)}</span>
          <span className="details-unit">/ {product.unit}</span>
        </div>

        <div className="details-availability">
          <span className="stock-label">Availability:</span>
          {isOutOfStock ? (
            <span className="out-of-stock">Out of Stock</span>
          ) : (
            <span className="in-stock">In Stock ({availableStock} available)</span>
          )}
        </div>

        {!isOutOfStock && (
          <div className="add-to-cart-section">
            <div className="qty-selector">
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <div className="qty-value">{quantity}</div>
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
              >+</button>
            </div>
            <button className="btn-add" onClick={handleAddToCart} disabled={adding}>
              {adding ? 'Adding...' : '🛒 Add to Cart'}
            </button>
          </div>
        )}

        <div>
          <Link to="/products" className="back-link">
            &larr; Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
