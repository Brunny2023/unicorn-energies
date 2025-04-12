
/**
 * Console Error Filter
 * 
 * This utility filters out common non-critical errors from the console
 * that might be related to browser extensions, CORS issues, or other
 * external factors that don't affect the core functionality.
 */

const IGNORED_ERROR_PATTERNS = [
  // Chrome extension related errors
  /extension/i,
  /Denying load of/i,
  /web_accessible_resources/i,
  
  // CORS related errors
  /has been blocked by CORS policy/i,
  
  // WebSocket errors
  /WebSocket connection to/i,
  /Max reconnect attempts/i,
  
  // Preload warnings
  /was preloaded but not used/i,
  
  // Messaging errors
  /message channel closed/i,
  
  // Firebase/Firestore specific
  /BloomFilter error/i,
  /Firestore.*WebChannelConnection/i,
  /firestore.googleapis.com/i,
  
  // Analytics/tracking blockers
  /plausible.io/i,
  
  // Feature detection errors
  /Unrecognized feature/i,
  
  // Recorder state errors
  /No response for request-get-recorder-state/i,
  
  // Unknown message types
  /Unknown message type/i
];

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Apply filters
console.error = function(...args) {
  // Check if any of the arguments match our ignore patterns
  const shouldIgnore = args.some(arg => {
    if (typeof arg === 'string') {
      return IGNORED_ERROR_PATTERNS.some(pattern => pattern.test(arg));
    }
    
    if (arg instanceof Error) {
      return IGNORED_ERROR_PATTERNS.some(pattern => 
        pattern.test(arg.message) || pattern.test(arg.stack || '')
      );
    }
    
    return false;
  });
  
  // If we shouldn't ignore it, pass to original console.error
  if (!shouldIgnore) {
    originalConsoleError.apply(console, args);
  }
};

// Also filter warnings that might be noise
console.warn = function(...args) {
  // Check if any of the arguments match our ignore patterns
  const shouldIgnore = args.some(arg => {
    if (typeof arg === 'string') {
      return IGNORED_ERROR_PATTERNS.some(pattern => pattern.test(arg));
    }
    
    if (arg instanceof Error) {
      return IGNORED_ERROR_PATTERNS.some(pattern => 
        pattern.test(arg.message) || pattern.test(arg.stack || '')
      );
    }
    
    return false;
  });
  
  // If we shouldn't ignore it, pass to original console.warn
  if (!shouldIgnore) {
    originalConsoleWarn.apply(console, args);
  }
};

// Export a default function for initializing the filter
export default function initConsoleFilter() {
  console.log("Console error filter initialized");
}

// Export named function for direct use
export function setupConsoleFilters() {
  console.log("Console error filters setup completed");
  return true;
}
