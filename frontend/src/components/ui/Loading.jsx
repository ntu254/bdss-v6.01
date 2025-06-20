import React from 'react';
import { cn } from '../../utils/ui-helpers';

/**
 * Premium Loading Component với nhiều variant
 */
const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className,
  ...props 
}) => {
  const sizeStyles = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variantStyles = {
    primary: 'text-red-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    current: 'text-current'
  };

  return (
    <svg
      className={cn(
        'animate-spin',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Dots Loading Animation
 */
const LoadingDots = ({ 
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const variantStyles = {
    primary: 'bg-red-600',
    secondary: 'bg-gray-600',
    white: 'bg-white'
  };

  return (
    <div className={cn('flex items-center space-x-1', className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            sizeStyles[size],
            variantStyles[variant]
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton Loading Component
 */
const Skeleton = ({
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-gray-200',
    text: 'h-4 bg-gray-200 rounded',
    avatar: 'rounded-full bg-gray-200',
    button: 'h-10 bg-gray-200 rounded-md'
  };

  return (
    <div
      className={cn(
        'animate-pulse',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};

/**
 * Page Loading Component
 */
const PageLoading = ({
  title = "Đang tải...",
  description = "Vui lòng đợi trong giây lát",
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] space-y-4',
        className
      )}
      {...props}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-red-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

/**
 * Content Loading with Skeleton
 */
const ContentLoading = ({ type = 'card', className, ...props }) => {
  const skeletonLayouts = {
    card: (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ),
    list: (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton variant="avatar" className="w-10 h-10" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    ),
    table: (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, j) => (
              <Skeleton key={j} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    ),
    dashboard: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 border rounded-lg space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton variant="avatar" className="w-8 h-8" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className={cn('animate-pulse', className)} {...props}>
      {skeletonLayouts[type]}
    </div>
  );
};

/**
 * Loading Button Component
 */
const LoadingButton = ({ 
  children,
  isLoading = false,
  loadingText = "Đang xử lý...",
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'relative inline-flex items-center justify-center',
        'px-4 py-2 border border-transparent rounded-md',
        'text-sm font-medium text-white',
        'bg-red-600 hover:bg-red-700',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner size="sm" variant="white" className="mr-2" />
      )}
      {isLoading ? loadingText : children}
    </button>
  );
};

export {
  LoadingSpinner,
  LoadingDots,
  Skeleton,
  PageLoading,
  ContentLoading,
  LoadingButton
};

export default LoadingSpinner;
