import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import { apiPlugin } from './server/vite-plugin-api.js'


// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), apiPlugin()],
})

