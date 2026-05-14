import React, { useState } from 'react';

interface ProductSliderProps {
  images: string[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ images }) => {
  const [currIdx, setCurrIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="product-modal__slider">
      <div className="product-modal__image">
        <img src={images[currIdx]} alt="Product" />
      </div>
      {images.length > 1 && (
        <div className="slider-controls">
          <button onClick={() => setCurrIdx((currIdx - 1 + images.length) % images.length)}>←</button>
          <span className="slider-dots">
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === currIdx ? 'active' : ''}`} />
            ))}
          </span>
          <button onClick={() => setCurrIdx((currIdx + 1) % images.length)}>→</button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
