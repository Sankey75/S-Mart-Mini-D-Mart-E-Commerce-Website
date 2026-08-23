import React from 'react';

const CategoryCard = ({ category, onClick, isSelected }) => {
  return (
    <div 
      onClick={() => onClick(category)}
      className={`category-card ${isSelected ? 'selected' : ''}`}
    >
      {category.name}
    </div>
  );
};

export default CategoryCard;
