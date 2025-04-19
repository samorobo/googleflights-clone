import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // This ensures .js files are treated as JSX files
      include: '**/*.{jsx,js,ts,tsx}',
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.(js|jsx)$/,
    exclude: []
  }
})