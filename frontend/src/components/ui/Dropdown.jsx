import React from 'react';
import { cn } from '../../utils/ui-helpers';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Premium Dropdown Component với animation và design cao cấp
 */
const Dropdown = ({
  children,
  trigger,
  placement = 'bottom-start',
  offset = 8,
  className,
  contentClassName,
  disabled = false,
  closeOnSelect = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef(null);
  const contentRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target) &&
        !contentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate position
  React.useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = triggerRect.bottom + offset;
      let left = triggerRect.left;

      // Adjust position based on placement
      switch (placement) {
        case 'top-start':
          top = triggerRect.top - offset;
          break;
        case 'top-end':
          top = triggerRect.top - offset;
          left = triggerRect.right;
          break;
        case 'bottom-end':
          left = triggerRect.right;
          break;
        case 'left':
          top = triggerRect.top;
          left = triggerRect.left - offset;
          break;
        case 'right':
          top = triggerRect.top;
          left = triggerRect.right + offset;
          break;
      }

      // Prevent overflow
      if (left + 200 > viewportWidth) {
        left = viewportWidth - 200 - 10;
      }
      if (top + 200 > viewportHeight) {
        top = triggerRect.top - 200 - offset;
      }

      setPosition({ top, left });
    }
  }, [isOpen, placement, offset]);

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = () => {
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className={cn(
          "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {trigger}
      </div>

      {/* Portal for dropdown content */}
      {isOpen && (
        <div
          ref={contentRef}
          className={cn(
            "fixed z-50 min-w-[200px]",
            "bg-white rounded-xl shadow-2xl border border-gray-200",
            "transform transition-all duration-200 ease-out",
            "animate-fadeInScale",
            contentClassName
          )}
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <div className="py-2" onClick={handleItemClick}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Dropdown Item Component
 */
const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  selected = false,
  icon,
  className,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-full px-4 py-3 text-left text-sm transition-colors",
      "flex items-center gap-3",
      "hover:bg-gray-50 focus:bg-gray-50",
      "focus:outline-none",
      selected && "bg-red-50 text-red-600",
      disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
      className
    )}
    {...props}
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    <span className="flex-1">{children}</span>
    {selected && <Check className="w-4 h-4 text-red-600" />}
  </button>
);

/**
 * Dropdown Divider Component
 */
const DropdownDivider = ({ className, ...props }) => (
  <hr className={cn("my-1 border-gray-200", className)} {...props} />
);

/**
 * Dropdown Header Component
 */
const DropdownHeader = ({ children, className, ...props }) => (
  <div
    className={cn(
      "px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * Select Component built on Dropdown
 */
const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Chọn...",
  disabled = false,
  error = false,
  className,
  size = 'md',
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find(option => option.value === value);

  const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm", 
    lg: "h-12 px-4 text-base"
  };

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  const trigger = (
    <div
      className={cn(
        "w-full rounded-lg border bg-white cursor-pointer",
        "flex items-center justify-between gap-2",
        "transition-all duration-200 ease-in-out",
        "focus-within:ring-2 focus-within:ring-red-500/20",
        sizeStyles[size],
        error ? "border-red-300" : "border-gray-300 hover:border-gray-400",
        disabled && "bg-gray-50 cursor-not-allowed",
        className
      )}
    >
      <span className={cn(
        "truncate",
        selectedOption ? "text-gray-900" : "text-gray-500"
      )}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronDown className={cn(
        "w-4 h-4 text-gray-400 transition-transform duration-200",
        isOpen && "rotate-180"
      )} />
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      disabled={disabled}
      closeOnSelect={true}
      className="w-full"
      {...props}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          onClick={() => handleSelect(option)}
          selected={option.value === value}
          disabled={option.disabled}
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export { Dropdown, DropdownItem, DropdownDivider, DropdownHeader, Select };
export default Dropdown;
