import React from 'react';
import { cn } from '../../utils/ui-helpers';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';

/**
 * Premium Table Component System
 */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-gradient-to-r from-gray-50 to-gray-100",
      "border-b border-gray-200",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-gray-100", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-50/50 font-medium",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ 
  className, 
  hover = true,
  selected = false,
  ...props 
}, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors",
      hover && "hover:bg-gray-50/80",
      selected && "bg-red-50 hover:bg-red-50",
      "data-[state=selected]:bg-red-50",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ 
  className, 
  sortable = false,
  sortDirection,
  onSort,
  ...props 
}, ref) => {
  const handleSort = () => {
    if (sortable && onSort) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(newDirection);
    }
  };

  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-gray-900",
        "text-xs uppercase tracking-wider",
        sortable && "cursor-pointer select-none hover:bg-gray-100/80",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      onClick={handleSort}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>{props.children}</span>
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp 
              className={cn(
                "w-3 h-3 -mb-1",
                sortDirection === 'asc' ? "text-red-600" : "text-gray-400"
              )} 
            />
            <ChevronDown 
              className={cn(
                "w-3 h-3",
                sortDirection === 'desc' ? "text-red-600" : "text-gray-400"
              )} 
            />
          </div>
        )}
      </div>
    </th>
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle text-gray-900",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * Data Table Component với sorting, filtering, pagination
 */
const DataTable = ({
  data = [],
  columns = [],
  sortable = true,
  filterable = true,
  pagination = true,
  pageSize = 10,
  className,
  onRowClick,
  selectedRows = [],
  onRowSelect,
  loading = false,
  emptyMessage = "Không có dữ liệu",
  ...props
}) => {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');

  // Filtered data
  const filteredData = React.useMemo(() => {
    if (!filter) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  // Sorted data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginated data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => (direction) => {
    setSortConfig({ key, direction });
  };

  const handleRowClick = (row, index) => {
    onRowClick?.(row, index);
  };

  const handleRowSelect = (row, selected) => {
    onRowSelect?.(row, selected);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      {/* Filter */}
      {filterable && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <span className="text-sm text-gray-500">
            {sortedData.length} kết quả
          </span>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  sortable={sortable && column.sortable !== false}
                  sortDirection={sortConfig.key === column.key ? sortConfig.direction : null}
                  onSort={handleSort(column.key)}
                  className={column.headerClassName}
                >
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-24 text-center text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(row, index)}
                  selected={selectedRows.includes(row)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.key}
                      className={column.cellClassName}
                    >
                      {column.render 
                        ? column.render(row[column.key], row, index)
                        : row[column.key]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị {((currentPage - 1) * pageSize) + 1} đến {Math.min(currentPage * pageSize, sortedData.length)} 
            trong tổng số {sortedData.length} kết quả
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Trước
            </button>
            <span className="px-3 py-1 text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  DataTable
};

export default Table;
