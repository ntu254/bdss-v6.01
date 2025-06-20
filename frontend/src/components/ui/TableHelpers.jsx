// Table Helper Component - Loại bỏ code lặp cho tables
import React from 'react';
import { cn, table, spacing } from '../../utils/ui-helpers';

// Table Container
export const TableContainer = ({ children, className = '' }) => (
  <div className={cn(table.tableContainer, className)}>
    {children}
  </div>
);

// Table
export const Table = ({ children, className = '' }) => (
  <table className={cn(table.table, className)}>
    {children}
  </table>
);

// Table Head
export const TableHead = ({ children, className = '' }) => (
  <thead className={cn(table.thead, className)}>
    {children}
  </thead>
);

// Table Header Cell
export const TableHeader = ({ 
  children, 
  className = '', 
  center = false, 
  sortable = false,
  onClick
}) => {
  const baseClass = sortable ? table.thSortable : (center ? table.thCenter : table.th);
  
  return (
    <th 
      className={cn(baseClass, className)}
      onClick={onClick}
    >
      {children}
    </th>
  );
};

// Table Body
export const TableBody = ({ children, className = '' }) => (
  <tbody className={cn(table.tbody, className)}>
    {children}
  </tbody>
);

// Table Row
export const TableRow = ({ 
  children, 
  className = '', 
  selected = false,
  onClick 
}) => (
  <tr 
    className={cn(
      table.row,
      selected && table.rowSelected,
      onClick && 'cursor-pointer',
      className
    )}
    onClick={onClick}
  >
    {children}
  </tr>
);

// Table Cell
export const TableCell = ({ 
  children, 
  className = '', 
  center = false 
}) => (
  <td className={cn(center ? table.tdCenter : table.td, className)}>
    {children}
  </td>
);

// Table Footer
export const TableFooter = ({ children, className = '' }) => (
  <div className={cn(table.tfoot, className)}>
    {children}
  </div>
);

// Status Badge Component
export const StatusBadge = ({ 
  status, 
  children, 
  className = '' 
}) => {
  const statusClasses = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusClasses[status] || statusClasses.info,
      className
    )}>
      {children}
    </span>
  );
};

// Action Button for tables
export const ActionButton = ({ 
  variant = 'primary', 
  size = 'sm', 
  children, 
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  return (
    <button
      className={cn(
        'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Pagination Component
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 10,
  className = ''
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {showInfo && (
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{startItem}</span> đến{' '}
          <span className="font-medium">{endItem}</span> trong tổng số{' '}
          <span className="font-medium">{totalItems}</span> kết quả
        </div>
      )}
      
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500'
          )}
        >
          Trước
        </button>
        
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? onPageChange(page) : null}
            disabled={page === '...'}
            className={cn(
              'px-3 py-2 text-sm font-medium rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              page === currentPage
                ? 'bg-primary-600 text-white'
                : page === '...'
                ? 'cursor-default'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500'
          )}
        >
          Sau
        </button>
      </nav>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ 
  icon: Icon,
  title = 'Không có dữ liệu',
  description = 'Không tìm thấy dữ liệu nào.',
  action,
  className = ''
}) => (
  <div className={cn('text-center py-12', className)}>
    {Icon && (
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
    )}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6">{description}</p>
    {action && action}
  </div>
);

// Search Input Component
export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className = ''
}) => (
  <div className={cn('relative', className)}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        'placeholder-gray-500 text-sm'
      )}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
);

export default {
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  StatusBadge,
  ActionButton,
  Pagination,
  EmptyState,
  SearchInput
};
