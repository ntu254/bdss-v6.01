import React from 'react';
import { cn, spacing, typography, colors, patterns, flex, grid } from '../../utils/ui-helpers';

// Layout Components để tái sử dụng patterns phổ biến

// Container component với responsive padding
export const Container = ({ children, size = 'default', className, ...props }) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
    full: 'w-full',
  };
  
  return (
    <div 
      className={cn(
        sizeClasses[size], 
        'mx-auto px-4 sm:px-6 lg:px-8',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Section wrapper với consistent spacing
export const Section = ({ 
  children, 
  size = 'default', 
  background = 'default',
  className, 
  gradient,
  ...props 
}) => {
  const sizeClasses = {
    sm: spacing.py12,
    default: spacing.py16,
    lg: spacing.py24,
  };
  
  const backgroundClasses = {
    default: '',
    gray: 'bg-gray-50',
    white: 'bg-white',
    primary: 'bg-red-50',
  };
  
  return (
    <section 
      className={cn(
        sizeClasses[size],
        backgroundClasses[background],
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )} 
      {...props}
    >
      {children}
    </section>
  );
};

// Grid component với responsive columns
export const Grid = ({ 
  children, 
  cols = '1', 
  gap = '6',
  className, 
  ...props 
}) => {
  // Helper để convert string như "1 md:2 lg:3" thành classes
  const getGridCols = (colsString) => {
    const colMap = {
      '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3', 
      '4': 'grid-cols-4', '5': 'grid-cols-5', '6': 'grid-cols-6',
      'md:1': 'md:grid-cols-1', 'md:2': 'md:grid-cols-2', 'md:3': 'md:grid-cols-3',
      'md:4': 'md:grid-cols-4', 'lg:1': 'lg:grid-cols-1', 'lg:2': 'lg:grid-cols-2',
      'lg:3': 'lg:grid-cols-3', 'lg:4': 'lg:grid-cols-4'
    };
    return colsString.split(' ').map(col => colMap[col]).filter(Boolean).join(' ');
  };

  return (
    <div 
      className={cn(
        'grid',
        getGridCols(cols),
        `gap-${gap}`,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Stack component cho vertical layout
export const Stack = ({ 
  children, 
  space = 'default', 
  align = 'stretch',
  className, 
  ...props 
}) => {
  const spaceClasses = {
    sm: spacing.gap2,
    default: spacing.gap4,
    lg: spacing.gap6,
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  
  return (
    <div 
      className={cn(
        'flex flex-col',
        spaceClasses[space],
        alignClasses[align],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Inline component cho horizontal layout
export const Inline = ({ 
  children, 
  space = 'default', 
  align = 'center',
  wrap = false,
  className, 
  ...props 
}) => {
  const spaceClasses = {
    sm: spacing.gap1,
    default: spacing.gap2,
    lg: spacing.gap3,
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };
  
  return (
    <div 
      className={cn(
        'flex',
        spaceClasses[space],
        alignClasses[align],
        wrap && 'flex-wrap',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Card component với variants
export const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'default',
  interactive = false,
  className, 
  ...props 
}) => {
  const variantClasses = {
    default: patterns.card,
    professional: patterns.cardProfessional,
    glass: patterns.cardGlass,
  };
  
  const paddingClasses = {
    none: '',
    sm: spacing.p4,
    default: spacing.p6,
    lg: spacing.p8,
  };
  
  return (
    <div 
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        interactive && 'hover:shadow-lg cursor-pointer transition-shadow',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// PageHeader component
export const PageHeader = ({ 
  title, 
  subtitle, 
  breadcrumbs, 
  actions,
  className, 
  ...props 
}) => {
  return (
    <div className={cn(flex.centerBetween, spacing.mb8, className)} {...props}>
      <div>
        {breadcrumbs && (
          <div className="mb-2 text-sm text-gray-500">
            {breadcrumbs}
          </div>
        )}
        <h1 className={typography.heading1}>{title}</h1>
        {subtitle && (
          <p className={cn(colors.text.secondary, 'mt-1')}>{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};

// FormGroup component
export const FormGroup = ({ 
  label, 
  children, 
  error, 
  required = false,
  className, 
  ...props 
}) => {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {label && (
        <label className={cn(
          'block text-sm font-medium text-gray-700',
          required && 'after:content-["*"] after:text-red-500 after:ml-1'
        )}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// StatusBadge component
export const StatusBadge = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className, 
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    primary: 'bg-primary-100 text-primary-800',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };
  
  return (
    <span 
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
};

// Icon wrapper component
export const Icon = ({ 
  icon: IconComponent, 
  size = 'default', 
  className, 
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    default: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };
  
  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
      {...props} 
    />
  );
};

// Divider component
export const Divider = ({ 
  orientation = 'horizontal', 
  className, 
  ...props 
}) => {
  const orientationClasses = {
    horizontal: 'border-t border-gray-200 w-full',
    vertical: 'border-l border-gray-200 h-full',
  };
  
  return (
    <div 
      className={cn(orientationClasses[orientation], className)} 
      {...props} 
    />
  );
};
