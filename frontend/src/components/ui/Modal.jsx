import React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../utils/ui-helpers';
import { X } from 'lucide-react';
import Button from '../common/Button';

/**
 * Premium Modal Component với animation cao cấp
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
  contentClassName,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeStyles = {
    xs: 'max-w-sm',
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  const variantStyles = {
    default: 'bg-white',
    glass: 'bg-white/95 backdrop-blur-sm',
    dark: 'bg-gray-900 text-white'
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-out",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
      {...props}
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0",
          overlayClassName
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative w-full rounded-2xl shadow-2xl",
          "transform transition-all duration-300 ease-out",
          isAnimating ? "scale-100 translate-y-0" : "scale-95 translate-y-4",
          sizeStyles[size],
          variantStyles[variant],
          contentClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10",
              "p-2 rounded-lg transition-colors",
              "hover:bg-gray-100 focus:bg-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-gray-300"
            )}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}

        {/* Header */}
        {(title || description) && (
          <div className="px-6 py-6 border-b border-gray-100">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 pr-8">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 text-sm text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("p-6", className)}>
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

/**
 * Modal Header Component
 */
const ModalHeader = ({ children, className, ...props }) => (
  <div className={cn("px-6 py-4 border-b border-gray-200", className)} {...props}>
    {children}
  </div>
);

/**
 * Modal Body Component
 */
const ModalBody = ({ children, className, ...props }) => (
  <div className={cn("px-6 py-4", className)} {...props}>
    {children}
  </div>
);

/**
 * Modal Footer Component
 */
const ModalFooter = ({ children, className, ...props }) => (
  <div 
    className={cn(
      "px-6 py-4 border-t border-gray-200",
      "flex items-center justify-end gap-3",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

/**
 * Confirmation Modal Component
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "warning",
  isLoading = false,
  ...props
}) => {
  const typeStyles = {
    warning: {
      icon: "⚠️",
      confirmVariant: "warning"
    },
    danger: {
      icon: "🚨",
      confirmVariant: "danger"
    },
    info: {
      icon: "ℹ️",
      confirmVariant: "primary"
    },
    success: {
      icon: "✅",
      confirmVariant: "success"
    }
  };

  const config = typeStyles[type];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      {...props}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">{config.icon}</div>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmModal };
export default Modal;
