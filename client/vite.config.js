import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // proxy: {
    //   '/events': 'http://localhost:4005',
    //   '/posts': 'http://localhost:4000',
    //   '/comments': 'http://localhost:4001',
    // },
  },

})
