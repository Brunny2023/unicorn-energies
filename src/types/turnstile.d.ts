
interface TurnstileObject {
  render: (containerId: string, config: TurnstileConfig) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

interface TurnstileConfig {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

interface Window {
  turnstile: TurnstileObject;
}
