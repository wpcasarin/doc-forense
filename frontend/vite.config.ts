import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  define: {
    'process.env': {
      VITE_POCKETBASE_URL: process.env.VITE_POCKETBASE_URL,
      VITE_FASTAPI_URL: process.env.VITE_FASTAPI_URL,
    },
  },
  plugins: [solid(), tailwindcss()],
});
