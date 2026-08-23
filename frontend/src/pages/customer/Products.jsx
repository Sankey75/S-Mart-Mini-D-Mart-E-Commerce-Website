import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import SearchBar from '../../components/SearchBar';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (search = '') => {
    setLoading(true);
    try {
      const [prodData, catData] = await Promise.all([
        productService.getAllProducts(search),
        categoryService.getAllCategories()
      ]);
      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    fetchData(term);
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category.id === selectedCategory.id)
    : products;

  return (
    <div className="products-container">
      <div className="search-wrapper">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div>
        <h2 className="section-title">Categories</h2>
        <div className="categories-scroll">
          <CategoryCard 
            category={{ name: 'All' }} 
            isSelected={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map(cat => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              isSelected={selectedCategory?.id === cat.id}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      </div>

      <h2 className="section-title">Products</h2>
      {loading ? (
        <div className="empty-state">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No products found.</div>
      )}
    </div>
  );
};

export default Products;
