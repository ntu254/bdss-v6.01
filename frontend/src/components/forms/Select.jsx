// components/forms/Select.jsx - Reusable select component
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/ui-helpers';

const Select = React.forwardRef(({
  className,
  label,
  error,
  helperText,
  required = false,
  placeholder = 'Chọn...',
  options = [],
  children,
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
      
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded-md border-gray-300 shadow-sm",
            "focus:border-red-500 focus:ring-red-500 sm:text-sm",
            "disabled:bg-gray-50 disabled:text-gray-500",
            "appearance-none pr-10",
            error && "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          
          {children}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      
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

Select.displayName = 'Select';

export default Select;
