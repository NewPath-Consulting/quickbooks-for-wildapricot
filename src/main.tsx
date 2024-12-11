import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {OnBoardingProvider} from "./contexts/onBoardingContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OnBoardingProvider>
      <App />
    </OnBoardingProvider>
  </StrictMode>,
)
