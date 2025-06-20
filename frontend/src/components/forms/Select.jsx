import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Styled select element with optional label support.
 */
const Select = React.forwardRef(
  ({ label, id, className = '', children, ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn('border rounded p-2 w-full', className)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
);

export default Select;
