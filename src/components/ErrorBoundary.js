import React, { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, errorInfo) {
      // Update state to indicate error
      this.setState({ hasError: true });
      // You can log the error or send it to a logging service
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Fallback UI to display when an error occurs
        return <div>Something went wrong.</div>;
      }
      // Render children components as usual
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;