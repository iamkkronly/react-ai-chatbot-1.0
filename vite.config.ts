// Copyright (c) Kaustav Ray

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['react-ai-chatbot-1-0.onrender.com'],
  },
});
