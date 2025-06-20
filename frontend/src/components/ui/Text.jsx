import { cn } from '../../utils/ui-helpers';

const Text = ({ 
  children, 
  as: Component = "p",
  variant = "body",
  color = "default",
  className = "",
  ...props 
}) => {
  const variantClasses = {
    // Headings
    h1: "heading-1 md:text-5xl lg:text-6xl",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
    h3: "text-2xl md:text-3xl font-bold leading-tight",
    h4: "text-xl md:text-2xl font-semibold leading-snug",
    h5: "text-lg md:text-xl font-semibold leading-snug",
    h6: "text-base md:text-lg font-medium leading-snug",
    
    // Body text
    body: "text-base leading-relaxed",
    "body-lg": "text-lg leading-relaxed",
    "body-sm": "text-sm leading-relaxed",
    
    // Special
    lead: "text-xl md:text-2xl leading-relaxed text-secondary-600",
    caption: "text-sm text-secondary-500",
    overline: "text-xs font-medium uppercase tracking-wider text-secondary-500",
  };

  const colorClasses = {
    default: "text-secondary-900",
    muted: "text-secondary-600",
    light: "text-secondary-500",
    primary: "text-primary-600",
    white: "text-white",
    inherit: "",
  };

  return (
    <Component 
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
