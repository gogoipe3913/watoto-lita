export {};

declare global {
  interface Window {
    Typekit?: {
      load: (config?: { async?: boolean }) => void;
    };
  }
}
