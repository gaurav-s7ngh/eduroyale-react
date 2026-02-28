import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css' // <-- CHANGE THIS LINE
import './index.css' // <-- ADD THIS LINE TO LOAD TAILWIND!
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)