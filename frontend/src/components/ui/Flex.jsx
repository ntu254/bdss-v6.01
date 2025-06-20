import { cn } from '../../utils/ui-helpers';

const Flex = ({ 
  children, 
  direction = "row",
  align = "center",
  justify = "start",
  wrap = false,
  gap = "0",
  className = "",
  ...props 
}) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div 
      className={cn(
        "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        gap !== "0" && `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
