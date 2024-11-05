import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import logger from './utils/logger';

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  logger.error('Uncaught error', {
    message,
    source,
    lineno,
    colno,
    error: error?.stack
  });
};

// Global handler for unhandled promise rejections
window.onunhandledrejection = (event) => {
  logger.error('Unhandled promise rejection', {
    reason: event.reason,
    stack: event.reason?.stack
  });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PerformanceMonitor />
      <App />
    </ErrorBoundary>
  </StrictMode>
);