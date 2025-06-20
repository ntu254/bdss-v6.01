<<<<<<< codex/fix-frontend-code-optimization-and-ui/ux
export { default } from '../forms/Input.jsx';
=======
import React from 'react';

const InputField = ({ label, id, type = 'text', className = '', ...props }) => (
  <div className="space-y-1">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      className={`w-full border rounded p-2 ${className}`}
      {...props}
    />
  </div>
);

export default InputField;
>>>>>>> main
