import { captureException } from './logger';

interface ErrorInfo {
  componentStack: string;
}

export const handleError = (error: Error, errorInfo?: ErrorInfo) => {
  captureException(error, {
    extra: {
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.group('🐛 Error caught by error boundary:');
    console.error(error);
    console.error('Component stack:', errorInfo?.componentStack);
    console.groupEnd();
  }
};

export const validateFormFields = (data: Record<string, any>, rules: Record<string, any>) => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = 'Это поле обязательно';
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Минимальная длина ${rule.minLength} символов`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
    }
  });

  return errors;
};

export const validateApiResponse = <T>(response: T): boolean => {
  if (!response) {
    captureException(new Error('Empty API response'));
    return false;
  }
  return true;
};

export const performanceMonitor = {
  start: (operationName: string) => {
    const start = performance.now();
    return {
      end: () => {
        const duration = performance.now() - start;
        // Increased threshold to 2.5 seconds to match actual app initialization needs
        if (duration > 2500) {
          console.warn(`Performance warning: ${operationName} took ${duration}ms`);
          captureException(new Error(`Performance degradation: ${operationName}`), {
            extra: { duration, operationName }
          });
        }
      }
    };
  }
};