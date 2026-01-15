import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
      tailwindcss(),
  ],
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
 theme: {
    extend: {
      boxShadow: {
         'amber': '0 10px 25px rgba(217, 119, 6, 0.5)',
        'lg': '0 10px 25px rgba(5, 150, 105, 0.5)', 
      },
    },
  },
})
