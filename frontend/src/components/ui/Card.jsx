import React from 'react';
import { cn } from '../../utils/ui-helpers.js';

/**
 * Premium Card Component System
 * Hỗ trợ nhiều variant và hiệu ứng cao cấp
 */

const Card = React.forwardRef(({ 
    className, 
    children, 
    variant = 'default',
    hover = false, 
    elevated = false,
    interactive = false,
    ...props 
}, ref) => {
    const baseStyles = cn(
        "rounded-xl bg-white border transition-all duration-200 ease-in-out",
        "relative overflow-hidden"
    );

    const variantStyles = {
        default: "border-gray-200 shadow-sm",
        elevated: "border-gray-200 shadow-lg shadow-gray-900/10",
        outlined: "border-2 border-gray-300 shadow-none",
        glass: "border-white/20 bg-white/80 backdrop-blur-sm shadow-lg",
        gradient: "border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl shadow-gray-900/20",
    };

    const interactionStyles = cn(
        hover && "hover:shadow-xl hover:shadow-gray-900/15 hover:-translate-y-1",
        interactive && "cursor-pointer active:scale-[0.98]",
        elevated && "hover:shadow-2xl hover:shadow-gray-900/25"
    );

    return (
        <div
            ref={ref}
            className={cn(
                baseStyles,
                variantStyles[variant],
                interactionStyles,
                className
            )}
            {...props}
        >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col space-y-2 p-6 pb-4",
            "border-b border-gray-100/80",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, children, size = 'md', ...props }, ref) => {
    const sizeStyles = {
        sm: "text-lg font-semibold",
        md: "text-xl font-semibold",
        lg: "text-2xl font-bold",
        xl: "text-3xl font-bold"
    };

    return (
        <h3
            ref={ref}
            className={cn(
                sizeStyles[size],
                "leading-tight tracking-tight text-gray-900",
                "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            "text-sm leading-relaxed text-gray-600",
            "max-w-2xl",
            className
        )}
        {...props}
    >
        {children}
    </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("p-6 pt-4", className)}
        {...props}
    >
        {children}
    </div>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between p-6 pt-0",
            "border-t border-gray-100/80 mt-4 pt-4",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;