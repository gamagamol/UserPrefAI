import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
// export default defineConfig({
  
//   plugins: [react(),tailwindcss()],
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
 define: {
      'process.env.VITE_URL_BACKEND': JSON.stringify(env.VITE_URL_BACKEND),
    },
  plugins: [react(),tailwindcss()],

  }
})
