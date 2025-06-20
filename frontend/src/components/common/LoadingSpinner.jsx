import React from 'react';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({ className = '' }) => (
  <div
    className={cn(
      'animate-spin h-5 w-5 border-4 border-gray-300 border-t-red-600 rounded-full',
      className
    )}
  />
);

export default LoadingSpinner;
