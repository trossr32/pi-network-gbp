import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import HoldingsJsonPage from './pages/HoldingsJsonPage';
import './index.css';

const path = window.location.pathname;

// Use .includes to support Vite's base path
const isHoldingsJson = path.includes('/holdings-json');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHoldingsJson
      ? <HoldingsJsonPage />
      : <App />
    }
  </StrictMode>
);
