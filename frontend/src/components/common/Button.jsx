import React from 'react';
import { cn } from '../../utils/cn.js';
import LoadingSpinner from './LoadingSpinner';

/**
 * Premium Button Component với design system cao cấp
 * Hỗ trợ nhiều variant, size và trạng thái khác nhau
 */
const Button = React.forwardRef(({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    isLoading = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    ...props
}, ref) => {
    const baseStyles = cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed',
        'relative overflow-hidden',
        // Full width
        fullWidth && 'w-full'
    );

    const sizeStyles = {
        xs: 'px-2.5 py-1.5 text-xs min-h-[28px]',
        sm: 'px-3 py-2 text-sm min-h-[32px]',
        md: 'px-4 py-2.5 text-sm min-h-[40px]',
        lg: 'px-6 py-3 text-base min-h-[44px]',
        xl: 'px-8 py-4 text-lg min-h-[52px]',
    };    const variantStyles = {
        primary: cn(
            'text-white bg-gradient-to-r from-red-600 to-red-700',
            'hover:from-red-700 hover:to-red-800',
            'active:from-red-800 active:to-red-900',
            'focus:ring-red-500 focus:ring-opacity-50',
            'shadow-lg shadow-red-500/25',
            'disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none'
        ),
        secondary: cn(
            'text-gray-700 bg-white border border-gray-300',
            'hover:bg-gray-50 hover:border-gray-400',
            'active:bg-gray-100',
            'focus:ring-gray-300 focus:ring-opacity-50',
            'shadow-sm',
            'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200'
        ),
        outline: cn(
            'text-red-600 bg-transparent border-2 border-red-600',
            'hover:bg-red-50 hover:border-red-700',
            'active:bg-red-100',
            'focus:ring-red-500 focus:ring-opacity-30',
            'disabled:text-gray-400 disabled:border-gray-300 disabled:hover:bg-transparent'
        ),
        ghost: cn(
            'text-gray-700 bg-transparent',
            'hover:bg-gray-100 hover:text-gray-900',
            'active:bg-gray-200',
            'focus:ring-gray-300 focus:ring-opacity-50',
            'disabled:text-gray-400 disabled:hover:bg-transparent'
        ),
        danger: cn(
            'text-white bg-gradient-to-r from-red-500 to-red-600',
            'hover:from-red-600 hover:to-red-700',
            'active:from-red-700 active:to-red-800',
            'focus:ring-red-500 focus:ring-opacity-50',
            'shadow-lg shadow-red-500/25',
            'disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none'
        ),
        success: cn(
            'text-white bg-gradient-to-r from-emerald-500 to-emerald-600',
            'hover:from-emerald-600 hover:to-emerald-700',
            'active:from-emerald-700 active:to-emerald-800',
            'focus:ring-emerald-500 focus:ring-opacity-50',
            'shadow-lg shadow-emerald-500/25',
            'disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none'
        ),
        warning: cn(
            'text-white bg-gradient-to-r from-amber-500 to-amber-600',
            'hover:from-amber-600 hover:to-amber-700',
            'active:from-amber-700 active:to-amber-800',
            'focus:ring-amber-500 focus:ring-opacity-50',
            'shadow-lg shadow-amber-500/25',
            'disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none'
        ),
        link: cn(
            'text-red-600 bg-transparent p-0 h-auto min-h-0',
            'hover:text-red-700 hover:underline',
            'active:text-red-800',
            'focus:ring-red-500 focus:ring-opacity-30',
            'disabled:text-gray-400 disabled:no-underline'
        ),
    };

    return (
        <button
            ref={ref}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {/* Background hover effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            {/* Loading spinner */}
            {isLoading && (
                <LoadingSpinner size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} />
            )}
            
            {/* Left icon */}
            {!isLoading && iconLeft && (
                <span className="flex-shrink-0">
                    {iconLeft}
                </span>
            )}
            
            {/* Content */}
            <span className="relative z-10">
                {children}
            </span>
            
            {/* Right icon */}
            {!isLoading && iconRight && (
                <span className="flex-shrink-0">
                    {iconRight}
                </span>
            )}
        </button>
    );
});

Button.displayName = "Button";

export default Button;