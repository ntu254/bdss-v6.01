import React from 'react';

export const Badge = ({ children, className = '' }) => (
  <span className={`inline-block px-2 py-1 text-xs rounded bg-red-100 text-red-700 ${className}`}>{children}</span>
);

export default Badge;
