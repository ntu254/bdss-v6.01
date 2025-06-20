import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Multi-line textarea with optional label.
 */
const Textarea = React.forwardRef(({ label, id, className = '', ...props }, ref) => (
  <div className="space-y-1">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
    )}
    <textarea
      ref={ref}
      id={id}
      className={cn('border rounded p-2 w-full', className)}
      {...props}
    />
  </div>
));

export default Textarea;
