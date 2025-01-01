import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/ez-dialogs.ts",
      name: "Ez Dialogs",
      fileName: "ez-dialogs",
    },
  },
  plugins: [dts()],
});
