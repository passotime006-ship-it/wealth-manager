import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProviderWrapper } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <AuthProvider>
        <BrowserRouter basename="/wealth-manager">
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
