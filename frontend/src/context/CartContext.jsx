import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/cartService';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const data = await cartService.addToCart(productId, quantity);
      setCart(data);
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add item to cart.");
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity);
      setCart(data);
    } catch (error) {
      console.error("Error updating cart quantity", error);
    }
  };

  const clearCart = async () => {
    try {
      const data = await cartService.clearCart();
      setCart(data);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
