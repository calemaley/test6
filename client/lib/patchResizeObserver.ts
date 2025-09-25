// Suppress noisy Chrome ResizeObserver errors without hiding real errors
if (typeof window !== "undefined") {
  const MESSAGES = [
    "ResizeObserver loop completed with undelivered notifications.",
    "ResizeObserver loop limit exceeded",
  ];

  // Block error events for these specific messages
  const onError = (e: ErrorEvent) => {
    if (MESSAGES.includes(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault?.();
    }
  };
  window.addEventListener("error", onError);

  // Filter console.error for these messages while preserving others
  const originalError = window.console.error;
  window.console.error = (...args: any[]) => {
    try {
      const first = args[0];
      if (
        typeof first === "string" &&
        MESSAGES.some((m) => first.includes(m))
      ) {
        return;
      }
    } catch {}
    originalError.apply(window.console, args as any);
  };
}
