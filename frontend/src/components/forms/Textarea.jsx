import React from 'react';

const Textarea = ({ label, id, className = '', ...props }) => (
  <div className="space-y-1">
    {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
    <textarea id={id} className={`border rounded p-2 w-full ${className}`} {...props} />
  </div>
);

export default Textarea;
