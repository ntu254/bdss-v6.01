import React from 'react';
import { cn } from '../../utils/ui-helpers';

/**
 * Premium Tabs Component System
 */
const TabsContext = React.createContext();

const Tabs = ({ 
  defaultValue, 
  value, 
  onValueChange, 
  orientation = 'horizontal',
  variant = 'default',
  className,
  children,
  ...props 
}) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);
  
  const currentValue = value !== undefined ? value : selectedTab;
  
  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setSelectedTab(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue = {
    value: currentValue,
    onValueChange: handleValueChange,
    orientation,
    variant
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div 
        className={cn(
          "w-full",
          orientation === 'vertical' && "flex gap-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const { orientation, variant } = React.useContext(TabsContext);
  
  const variantStyles = {
    default: "bg-gray-100 rounded-lg p-1",
    pills: "bg-transparent space-x-1",
    underline: "bg-transparent border-b border-gray-200",
    card: "bg-white border border-gray-200 rounded-lg p-1 shadow-sm"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        orientation === 'horizontal' ? "w-full" : "flex-col w-48",
        variantStyles[variant],
        className
      )}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ 
  value, 
  className, 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const { value: selectedValue, onValueChange, variant } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  const variantStyles = {
    default: cn(
      "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
      isSelected 
        ? "bg-white text-gray-900 shadow-sm" 
        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
    ),
    pills: cn(
      "px-4 py-2 text-sm font-medium rounded-full transition-all",
      isSelected 
        ? "bg-red-600 text-white shadow-lg shadow-red-600/25" 
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    ),
    underline: cn(
      "px-4 py-3 text-sm font-medium border-b-2 transition-all relative",
      isSelected 
        ? "text-red-600 border-red-600" 
        : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
    ),
    card: cn(
      "px-3 py-2 text-sm font-medium rounded-md transition-all",
      isSelected 
        ? "bg-red-50 text-red-700 border border-red-200" 
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    )
  };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className
      )}
      onClick={() => !disabled && onValueChange(value)}
      {...props}
    >
      {children}
      
      {/* Active indicator for underline variant */}
      {variant === 'underline' && isSelected && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
      )}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ 
  value, 
  className, 
  children,
  ...props 
}, ref) => {
  const { value: selectedValue } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
        "animate-fadeInScale",
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

/**
 * Convenience component for icon tabs
 */
const IconTab = ({ icon: Icon, label, badge, ...props }) => (
  <TabsTrigger {...props}>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
          {badge}
        </span>
      )}
    </div>
  </TabsTrigger>
);

/**
 * Pre-built tab configurations
 */
const StatusTabs = ({ onValueChange, defaultValue = 'all', className, ...props }) => {
  const statusOptions = [
    { value: 'all', label: 'Tất cả', count: 156 },
    { value: 'active', label: 'Hoạt động', count: 123 },
    { value: 'pending', label: 'Chờ duyệt', count: 23 },
    { value: 'inactive', label: 'Không hoạt động', count: 10 }
  ];

  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className={className} {...props}>
      <TabsList variant="pills">
        {statusOptions.map((option) => (
          <TabsTrigger key={option.value} value={option.value}>
            <span>{option.label}</span>
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
              {option.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  IconTab, 
  StatusTabs 
};

export default Tabs;
