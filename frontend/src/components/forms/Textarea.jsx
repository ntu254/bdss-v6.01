// components/forms/Textarea.jsx - Reusable textarea component
import React from 'react';
import { cn } from '../../utils/ui-helpers';

const Textarea = React.forwardRef(({
  className,
  label,
  error,
  helperText,
  required = false,
  rows = 3,
  ...props
}, ref) => {
  const id = props.id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-gray-700",
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm",
          "focus:border-red-500 focus:ring-red-500 sm:text-sm",
          "disabled:bg-gray-50 disabled:text-gray-500",
          "resize-vertical",
          error && "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500",
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${id}-description`} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
