import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['react-ai-chatbot-1-0.onrender.com'] // Replace with your actual Render domain
  }
});
