
/**
 * This utility filters out browser extension errors from the console
 * to keep it clean and focused on our application's actual issues.
 */

export const setupConsoleFilters = () => {
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;

  // Override console.error to filter out browser extension errors
  console.error = (...args) => {
    // Filter out chrome extension errors
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      (args[0].includes('chrome-extension://') || 
       args[0].includes('extension'))
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  // Override console.log to filter out extension logs
  console.log = (...args) => {
    // Filter out chrome extension and content.js related console logs
    if (
      args[0] === false || 
      args[0] === undefined || 
      (typeof args[0] === 'string' && 
        (args[0].includes('extension') || 
         args[0].includes('time: ƒ getTime')))
    ) {
      return;
    }
    originalConsoleLog(...args);
  };

  // Return a cleanup function to restore original console methods
  return () => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  };
};
