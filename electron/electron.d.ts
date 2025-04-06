// src/electron.d.ts
export {};

declare global {
  interface Window {
    electron: {
      saveFile: (content: string) => Promise<string>;
    };
  }
}
