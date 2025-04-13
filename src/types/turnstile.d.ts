
interface TurnstileObject {
  render: (containerId: string, config: any) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

interface Window {
  turnstile: TurnstileObject;
}
