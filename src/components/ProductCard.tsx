import React from 'react';
import { type Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="product-card"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
    >
      <div className="product-card__image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div style={{ color: '#ccc', fontSize: '0.8rem' }}>No image</div>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
