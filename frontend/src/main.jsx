import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './components/ui/Toast'

createRoot(document.getElementById('root')).render(  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
