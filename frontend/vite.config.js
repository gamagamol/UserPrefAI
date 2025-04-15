import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';


// https://vite.dev/config/
// export default defineConfig({
  
//   plugins: [react(),tailwindcss()],
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  server: {
      host: '0.0.0.0',
      port: 5173,
  },
  define: {
      'process.env.VITE_URL_BACKEND': JSON.stringify(env.VITE_URL_BACKEND),
    },
  plugins: [react(),tailwindcss()],

  }
})
