import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Basic text input element with optional label.
 * Supports forwarding refs for easy form integrations.
 */
const Input = React.forwardRef(
  ({ label, id, type = 'text', className = '', ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={cn('border rounded p-2 w-full', className)}
        {...props}
      />
    </div>
  )
);

export default Input;
