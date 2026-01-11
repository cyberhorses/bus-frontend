import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['localhost', '127.0.0.1', 'bus-app.pl']
  }
});
