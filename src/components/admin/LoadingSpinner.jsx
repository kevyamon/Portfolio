// src/components/admin/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ small }) {
  return (
    <div className={`spinner-container ${small ? 'small' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;