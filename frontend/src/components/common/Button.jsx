import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable button component that supports rendering as another element
 * via the `as` prop. This keeps markup flexible while maintaining
 * consistent styling.
 */
const Button = React.forwardRef(
  ({ as: Component = 'button', className = '', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </Component>
);

export default Button;
