import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "Ez Dialogs",
      fileName: "ez-dialogs",
    },
  },
});
