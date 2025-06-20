// components/common/ErrorBoundary.jsx - Error boundary component for better error handling
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Oops! Có lỗi xảy ra
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu lỗi tiếp tục xảy ra.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left mb-6 p-4 bg-gray-100 rounded-md">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                      Chi tiết lỗi (Development Mode)
                    </summary>
                    <pre className="text-xs text-red-600 overflow-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={this.handleRetry}
                    variant="primary"
                    iconLeft={<RefreshCw className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Thử lại
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="flex-1"
                  >
                    Về trang chủ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
