import React from 'react';

const LoadingSpinner = ({ className = '' }) => (
  <div className={`animate-spin h-5 w-5 border-4 border-gray-300 border-t-red-600 rounded-full ${className}`} />
);

export default LoadingSpinner;
