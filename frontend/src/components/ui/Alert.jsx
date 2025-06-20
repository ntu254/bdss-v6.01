import React from 'react';
import { cn } from '../../utils/ui-helpers';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Premium Alert Component System
 */
const Alert = React.forwardRef(({ 
  className, 
  variant = 'default',
  size = 'md',
  dismissible = false,
  onDismiss,
  children,
  ...props 
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const sizeStyles = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-sm',
    lg: 'p-6 text-base'
  };

  const variantStyles = {
    default: {
      container: 'bg-gray-50 border-gray-200 text-gray-800',
      icon: 'text-gray-600'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: 'text-blue-600'
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: 'text-emerald-600'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: 'text-amber-600'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-900',
      icon: 'text-red-600'
    }
  };

  const config = variantStyles[variant];

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative rounded-lg border shadow-sm',
        'transition-all duration-200 ease-in-out',
        config.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {children}
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              'ml-auto flex-shrink-0 p-1 rounded-md transition-colors',
              'hover:bg-black/10 focus:bg-black/10',
              'focus:outline-none focus:ring-2 focus:ring-black/20'
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
});
Alert.displayName = "Alert";

const AlertIcon = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const icons = {
    default: Info,
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle
  };

  const Icon = icons[variant];

  const variantStyles = {
    default: 'text-gray-600',
    info: 'text-blue-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    error: 'text-red-600'
  };

  return (
    <Icon
      ref={ref}
      className={cn(
        'w-5 h-5 flex-shrink-0 mt-0.5',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});
AlertIcon.displayName = "AlertIcon";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'font-semibold leading-none tracking-tight mb-1',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm leading-relaxed opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

/**
 * Pre-built Alert variants với icon và styling
 */
const InfoAlert = ({ title, children, ...props }) => (
  <Alert variant="info" {...props}>
    <AlertIcon variant="info" />
    <div className="flex-1">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </div>
  </Alert>
);

const SuccessAlert = ({ title, children, ...props }) => (
  <Alert variant="success" {...props}>
    <AlertIcon variant="success" />
    <div className="flex-1">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </div>
  </Alert>
);

const WarningAlert = ({ title, children, ...props }) => (
  <Alert variant="warning" {...props}>
    <AlertIcon variant="warning" />
    <div className="flex-1">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </div>
  </Alert>
);

const ErrorAlert = ({ title, children, ...props }) => (
  <Alert variant="error" {...props}>
    <AlertIcon variant="error" />
    <div className="flex-1">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </div>
  </Alert>
);

/**
 * Banner Alert cho thông báo quan trọng
 */
const BannerAlert = ({ 
  variant = 'info',
  title,
  children,
  action,
  dismissible = true,
  onDismiss,
  className,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variantStyles = {
    info: 'bg-blue-600 text-white',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white'
  };

  return (
    <div
      className={cn(
        'relative p-4 shadow-lg',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertIcon variant={variant} className="text-current" />
          <div>
            {title && (
              <div className="font-semibold text-sm mb-1">{title}</div>
            )}
            <div className="text-sm opacity-90">{children}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {action}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md hover:bg-white/20 focus:bg-white/20 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Floating Alert cho notifications
 */
const FloatingAlert = ({ 
  variant = 'info',
  title,
  children,
  position = 'top-right',
  autoHide = true,
  duration = 5000,
  onDismiss,
  className,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHide && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onDismiss]);

  if (!isVisible) return null;

  const positionStyles = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
  };

  return (
    <div className={positionStyles[position]}>
      <Alert
        variant={variant}
        dismissible
        onDismiss={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        className={cn(
          'max-w-sm shadow-lg animate-slideInRight',
          className
        )}
        {...props}
      >
        <AlertIcon variant={variant} />
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
  BannerAlert,
  FloatingAlert
};

export default Alert;
