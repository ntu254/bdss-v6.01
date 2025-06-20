import { cn } from '../../utils/ui-helpers';

const Container = ({ 
  children, 
  className = "", 
  size = "default",
  ...props 
}) => {
  const sizeClasses = {
    sm: "max-w-2xl",
    default: "max-w-7xl",
    lg: "max-w-screen-2xl",
    full: "max-w-none",
  };

  return (
    <div 
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
