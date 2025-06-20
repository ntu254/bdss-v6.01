import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className = '' }) => (
  <div className={cn('bg-white shadow rounded p-4', className)}>{children}</div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={cn('mb-2 font-bold text-lg', className)}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={cn('text-xl font-semibold', className)}>{children}</h3>
);
