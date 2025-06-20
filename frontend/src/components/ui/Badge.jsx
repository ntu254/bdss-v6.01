import React from 'react';
import { cn } from '../../utils/ui-helpers';

/**
 * Premium Badge Component với nhiều variant và animation
 */
const Badge = React.forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false,
  pulse = false,
  ...props
}, ref) => {
  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm',
    xl: 'px-4 py-2 text-base'
  };

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    primary: 'bg-red-100 text-red-800 border-red-200',
    secondary: 'bg-gray-100 text-gray-700 border-gray-300',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    
    // Solid variants
    'primary-solid': 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-lg shadow-red-500/25',
    'success-solid': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/25',
    'warning-solid': 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-lg shadow-amber-500/25',
    'error-solid': 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-lg shadow-red-500/25',
    'info-solid': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25',
    
    // Outline variants
    'primary-outline': 'bg-transparent text-red-600 border-red-600 hover:bg-red-50',
    'success-outline': 'bg-transparent text-emerald-600 border-emerald-600 hover:bg-emerald-50',
    'warning-outline': 'bg-transparent text-amber-600 border-amber-600 hover:bg-amber-50',
    'error-outline': 'bg-transparent text-red-600 border-red-600 hover:bg-red-50',
    'info-outline': 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50',
  };

  const baseStyles = cn(
    'inline-flex items-center justify-center',
    'font-medium rounded-full border',
    'transition-all duration-200 ease-in-out',
    'whitespace-nowrap',
    pulse && 'animate-pulse'
  );

  if (dot) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5',
          className
        )}
        {...props}
      >
        <span className={cn(
          'w-2 h-2 rounded-full',
          variantStyles[variant]?.split(' ')[0] || 'bg-gray-400',
          pulse && 'animate-pulse'
        )} />
        {children}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

/**
 * Status Badge với predefined styles cho các trạng thái thường dùng
 */
const StatusBadge = ({ status, className, ...props }) => {
  const statusConfig = {
    active: { variant: 'success-solid', children: 'Hoạt động' },
    inactive: { variant: 'default', children: 'Không hoạt động' },
    pending: { variant: 'warning', children: 'Đang chờ' },
    approved: { variant: 'success', children: 'Đã duyệt' },
    rejected: { variant: 'error', children: 'Từ chối' },
    completed: { variant: 'success-solid', children: 'Hoàn thành' },
    cancelled: { variant: 'error-outline', children: 'Đã hủy' },
    draft: { variant: 'default', children: 'Nháp' },
    published: { variant: 'success', children: 'Đã xuất bản' },
    emergency: { variant: 'error-solid', children: 'Khẩn cấp', pulse: true },
    high: { variant: 'warning-solid', children: 'Cao' },
    medium: { variant: 'warning', children: 'Trung bình' },
    low: { variant: 'info', children: 'Thấp' },
    available: { variant: 'success', children: 'Có sẵn' },
    unavailable: { variant: 'error', children: 'Không có sẵn' },
    'low-stock': { variant: 'warning-solid', children: 'Sắp hết', pulse: true },
  };

  const config = statusConfig[status] || { variant: 'default', children: status };

  return (
    <Badge
      variant={config.variant}
      pulse={config.pulse}
      className={className}
      {...props}
    >
      {config.children}
    </Badge>
  );
};

/**
 * Count Badge cho hiển thị số lượng
 */
const CountBadge = ({ count, max = 99, showZero = false, className, ...props }) => {
  if (!showZero && (!count || count === 0)) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count;

  return (
    <Badge
      variant="error-solid"
      size="xs"
      className={cn(
        'min-w-[1.25rem] h-5 text-xs font-bold',
        'absolute -top-1 -right-1',
        className
      )}
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

export { Badge, StatusBadge, CountBadge };
export default Badge;
