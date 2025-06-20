import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => (
  <div className="space-y-1">
    {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
    <input id={id} type={type} className={`border rounded p-2 w-full ${className}`} {...props} />
  </div>
);

export default Input;
