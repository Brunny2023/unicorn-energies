
interface TurnstileObject {
  render: (containerId: string, config: any) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare interface Window {
  turnstile: TurnstileObject;
}
