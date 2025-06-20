import { cn } from '../../utils/ui-helpers';

const Grid = ({ 
  children, 
  cols = "auto",
  gap = "6",
  className = "",
  responsive = true,
  ...props 
}) => {
  const getColsClass = (cols) => {
    if (typeof cols === 'object') {
      // Handle responsive object like { sm: 1, md: 2, lg: 3 }
      return Object.entries(cols)
        .map(([breakpoint, count]) => 
          breakpoint === 'base' ? `grid-cols-${count}` : `${breakpoint}:grid-cols-${count}`
        )
        .join(' ');
    }
    
    if (cols === 'auto') {
      return responsive 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-auto-fit';
    }
    
    return `grid-cols-${cols}`;
  };

  return (
    <div 
      className={cn(
        "grid",
        getColsClass(cols),
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
