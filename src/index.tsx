import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Hub from './Hub';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Hub />
  </React.StrictMode>
);