
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './utils/consoleErrorFilter.ts' // Import error filter before rendering

// Add console message for debugging
console.log('Unicorn Energies application initializing...');

// Log environment info
console.log('Environment info:', {
  nodeEnv: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
