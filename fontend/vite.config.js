import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://hatehatejonosheba.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
}
)
