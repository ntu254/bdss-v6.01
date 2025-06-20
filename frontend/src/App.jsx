import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotfoundPage'
import ForbiddenPage from './pages/ForbiddenPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'
import ErrorBoundary from './components/common/ErrorBoundary'
import ProtectedRoute from './components/auth/ProtectedRoute'

export default function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Auth routes - redirect if already logged in */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } 
        />        <Route 
          path="/register" 
          element={
            <ProtectedRoute requireAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Email verification route - public */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin routes - require admin role */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <div>Admin Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          } 
        />
          {/* Staff routes - require staff or admin role */}
        <Route 
          path="/staff/*" 
          element={
            <ProtectedRoute requiredRoles={['Staff', 'Admin']}>
              <div>Staff Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          } 
        />        
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  )
}
