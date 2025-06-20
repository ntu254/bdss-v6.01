import React from 'react';
import { cn } from '../../utils/ui-helpers';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("loading-skeleton h-4 w-full", className)}
      {...props}
    />
  );
};

export { Skeleton };