import React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../utils/ui-helpers';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Premium Toast Notification System
 */

// Toast Context
const ToastContext = React.createContext();

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      dismissible: true,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    // Convenience methods
    success: (message, options) => addToast({ ...options, type: 'success', message }),
    error: (message, options) => addToast({ ...options, type: 'error', message }),
    warning: (message, options) => addToast({ ...options, type: 'warning', message }),
    info: (message, options) => addToast({ ...options, type: 'info', message }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Container
const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  );
};

// Individual Toast Component
const Toast = ({
  id,
  type = 'info',
  message,
  title,
  description,
  dismissible = true,
  action,
  className,
  ...props
}) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => removeToast(id), 200);
  };

  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: "bg-emerald-50 border-emerald-200 text-emerald-800",
      iconClassName: "text-emerald-500"
    },
    error: {
      icon: AlertCircle,
      className: "bg-red-50 border-red-200 text-red-800",
      iconClassName: "text-red-500"
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-amber-50 border-amber-200 text-amber-800",
      iconClassName: "text-amber-500"
    },
    info: {
      icon: Info,
      className: "bg-blue-50 border-blue-200 text-blue-800",
      iconClassName: "text-blue-500"
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative rounded-lg border shadow-lg p-4",
        "transform transition-all duration-300 ease-in-out",
        "max-w-sm w-full",
        isVisible && !isExiting 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95",
        config.className,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <div className="text-sm font-semibold mb-1">
              {title}
            </div>
          )}
          
          {message && (
            <div className="text-sm">
              {message}
            </div>
          )}
          
          {description && (
            <div className="text-xs mt-1 opacity-80">
              {description}
            </div>
          )}
          
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>

        {dismissible && (
          <button
            onClick={handleClose}
            className={cn(
              "flex-shrink-0 p-1 rounded-md transition-colors",
              "hover:bg-black/10 focus:bg-black/10",
              "focus:outline-none focus:ring-2 focus:ring-black/20"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Progress bar for auto-dismiss */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
        <div 
          className="h-full bg-current opacity-60 transition-all duration-100 ease-linear"
          style={{
            animationName: 'toast-progress',
            animationDuration: '5s',
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards'
          }}
        />
      </div>
    </div>
  );
};

// Standalone toast function for one-off usage
export const toast = {
  success: (message, options) => {
    console.log('Success:', message);
  },
  error: (message, options) => {
    console.log('Error:', message);
  },
  warning: (message, options) => {
    console.log('Warning:', message);
  },
  info: (message, options) => {
    console.log('Info:', message);
  },
};

export { Toast };
export default Toast;
