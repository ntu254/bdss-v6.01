import { cn } from '../../utils/ui-helpers';

const Section = ({ 
  children, 
  className = "",
  variant = "default",
  background = "transparent",
  ...props 
}) => {
  const variantClasses = {
    default: "section-padding",
    compact: "py-12 md:py-16",
    spacious: "py-20 md:py-32",
  };

  const backgroundClasses = {
    transparent: "",
    white: "bg-white",
    gray: "bg-secondary-50",
    primary: "bg-primary-50",
    gradient: "bg-gradient-to-br from-primary-50 via-white to-secondary-50",
  };

  return (
    <section 
      className={cn(
        variantClasses[variant],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
