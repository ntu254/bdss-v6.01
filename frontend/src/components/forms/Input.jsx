import React from 'react';
import { cn } from '../../utils/ui-helpers';

/**
 * Premium Input Component
 * Hỗ trợ nhiều variant và hiệu ứng cao cấp
 */
const Input = React.forwardRef(({
  className,
  type = 'text',
  label,
  error,
  helperText,
  required = false,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const id = props.id || props.name;

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-4 text-base'
  };

  const variantStyles = {
    default: cn(
      'border-gray-300 bg-white',
      'focus:border-red-500 focus:ring-red-500/20 focus:ring-2',
      'hover:border-gray-400 transition-colors'
    ),
    outlined: cn(
      'border-2 border-gray-300 bg-white',
      'focus:border-red-500 focus:ring-red-500/10 focus:ring-4',
      'hover:border-gray-400'
    ),
    filled: cn(
      'border-0 bg-gray-50',
      'focus:bg-white focus:ring-2 focus:ring-red-500/20',
      'hover:bg-gray-100'
    )
  };

  const baseStyles = cn(
    'block w-full rounded-lg shadow-sm',
    'placeholder:text-gray-400',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    'transition-all duration-200'
  );

  const errorStyles = error && cn(
    'border-red-300 text-red-900',
    'focus:border-red-500 focus:ring-red-500/20',
    'placeholder:text-red-300'
  );

  const inputClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    errorStyles,
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  );

  return (
    <div className="space-y-2">
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
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          type={type}
          className={inputClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-description` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500" id={`${id}-description`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
