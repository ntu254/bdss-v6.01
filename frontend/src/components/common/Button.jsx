import React from 'react';

const Button = ({ className = '', children, ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
