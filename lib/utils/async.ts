export const timeout = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
