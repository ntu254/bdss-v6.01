import React from 'react';
import { cn } from '../../utils/cn';

const Container = ({ children, className = '' }) => (
  <div className={cn('max-w-5xl mx-auto px-4', className)}>{children}</div>
);

export default Container;
