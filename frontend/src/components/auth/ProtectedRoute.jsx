// components/auth/ProtectedRoute.jsx - Protected route component for role-based access
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requiredRoles = [], 
  redirectTo = '/login',
  forbiddenRedirect = '/forbidden' 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if auth required but user not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRoles.length > 0 && isAuthenticated) {
    const hasRequiredRole = requiredRoles.includes(user?.role);
    if (!hasRequiredRole) {
      return <Navigate to={forbiddenRedirect} replace />;
    }
  }

  // If user is authenticated and trying to access auth pages (login/register)
  if (!requireAuth && isAuthenticated && 
      (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
