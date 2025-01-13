// Image.jsx
import React from 'react';
import "./Image.css";

function Image({ src, alt }) {
  return (
    <div className="image-container">
      <img src={src} alt={alt} className="image" />
    </div>
  );
}

export default Image;