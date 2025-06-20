import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="p-4 text-red-600">Something went wrong.</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
