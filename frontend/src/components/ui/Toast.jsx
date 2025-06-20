import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = ({ children }) => (
  <>
    {children}
    <Toaster position="top-right" />
  </>
);

export default ToastProvider;
