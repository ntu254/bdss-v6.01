import React from 'react';

const Select = ({ label, id, className = '', children, ...props }) => (
  <div className="space-y-1">
    {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
    <select id={id} className={`border rounded p-2 w-full ${className}`} {...props}>
      {children}
    </select>
  </div>
);

export default Select;
