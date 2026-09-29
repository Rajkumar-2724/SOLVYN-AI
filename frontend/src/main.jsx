import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { WaveAnalysisProvider } from './contexts/WaveAnalysisContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WaveAnalysisProvider>
          <App />
        </WaveAnalysisProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
