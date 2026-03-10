import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './app/index.css'
import App from './app/App.tsx'
import { ThemeProvider } from './theme/theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
