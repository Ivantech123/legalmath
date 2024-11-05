import React, { useEffect } from 'react';
import logger from '../utils/logger';

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      const metrics = {
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
        domInteractive: navigation.domInteractive - navigation.navigationStart,
        domComplete: navigation.domComplete - navigation.navigationStart
      };

      // Log performance metrics
      logger.info('Page load performance metrics', metrics);

      // Alert if load time is too high
      if (metrics.loadTime > 3000) {
        logger.warning('High page load time detected', {
          loadTime: metrics.loadTime,
          url: window.location.href
        });
      }
    });

    // Monitor memory usage
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          logger.warning('High memory usage detected', {
            usedHeapSize: memory.usedJSHeapSize,
            heapSizeLimit: memory.jsHeapSizeLimit
          });
        }
      }
    };

    const memoryInterval = setInterval(checkMemory, 30000);

    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          logger.warning('Long task detected', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          });
        }
      });
    });

    observer.observe({ entryTypes: ['longtask'] });

    return () => {
      clearInterval(memoryInterval);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;