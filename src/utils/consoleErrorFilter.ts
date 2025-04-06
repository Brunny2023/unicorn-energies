
/**
 * This utility filters out browser extension errors and other unwanted messages from the console
 * to keep it clean and focused on our application's actual issues.
 */

export const setupConsoleFilters = () => {
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;

  // Override console.error to filter out browser extension errors
  console.error = (...args) => {
    // Filter out chrome extension errors and other unwanted errors
    if (
      args[0] && 
      (
        // Extension related filters
        (typeof args[0] === 'string' && 
          (args[0].includes('chrome-extension://') || 
           args[0].includes('extension') ||
           args[0].includes('Denying load of chrome-extension') ||
           args[0].includes('web_accessible_resources') ||
           args[0].includes('Unchecked runtime.lastError') ||
           args[0].includes('Could not establish connection. Receiving end does not exist'))) ||
        // 404 for grid-pattern.svg
        (typeof args[0] === 'string' && args[0].includes('grid-pattern.svg')) ||
        // Unchecked runtime.lastError
        (typeof args[0] === 'string' && args[0].includes('Unchecked runtime.lastError')) ||
        // Other specific error patterns
        (args[0] instanceof Error && args[0].message && 
          (args[0].message.includes('extension') || 
           args[0].message.includes('Receiving end does not exist')))
      )
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  // Override console.log to filter out extension logs
  console.log = (...args) => {
    // Filter out chrome extension and other unwanted logs
    if (
      args[0] === false || 
      args[0] === undefined || 
      (typeof args[0] === 'string' && 
        (args[0].includes('extension') || 
         args[0].includes('time: ƒ getTime'))) ||
      // Filter out content.js and other extension-related logs
      (typeof args[0] === 'string' && 
        (args[0].includes('content.js') || 
         args[0].includes('content.7f229555.js'))) ||
      // Filter out extension logs that only contain false or undefined
      (args.length === 1 && (args[0] === false || args[0] === undefined))
    ) {
      return;
    }
    originalConsoleLog(...args);
  };

  // Override console.warn to filter unwanted warnings
  console.warn = (...args) => {
    // Filter out extension-related warnings
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      (args[0].includes('extension') || 
       args[0].includes('Denying load') ||
       args[0].includes('Unknown message type') ||
       args[0].includes('grid-pattern.svg'))
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };

  // Return a cleanup function to restore original console methods
  return () => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
  };
};

// Check if we're in a browser environment and auto-apply the filters
if (typeof window !== 'undefined') {
  setupConsoleFilters();
}
