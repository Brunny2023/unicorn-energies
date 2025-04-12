
// Console error filter to reduce noise from browser extensions
export const setupConsoleFilters = () => {
  const originalError = console.error;
  const originalWarn = console.warn;

  // Filter out common browser extension errors
  console.error = function(...args) {
    const errorText = args.length > 0 ? String(args[0]) : '';
    
    // Filter out common browser extension errors
    if (
      errorText.includes('chrome-extension://') ||
      errorText.includes('web_accessible_resources') ||
      errorText.includes('Error: No response for request-get-recorder-state') ||
      errorText.includes('WebSocket connection') ||
      errorText.includes('Unrecognized feature')
    ) {
      return; // Ignore these errors
    }
    
    // Pass through all other errors
    originalError.apply(console, args);
  };

  // Filter out common browser extension warnings
  console.warn = function(...args) {
    const warnText = args.length > 0 ? String(args[0]) : '';
    
    if (
      warnText.includes('chrome-extension://') ||
      warnText.includes('was preloaded using link preload but not used') ||
      warnText.includes('Unrecognized feature')
    ) {
      return; // Ignore these warnings
    }
    
    // Pass through all other warnings
    originalWarn.apply(console, args);
  };

  console.log("Console error filters setup completed");
};
