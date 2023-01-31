import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/utils/ErrorBoundary';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);