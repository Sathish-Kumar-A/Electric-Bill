import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='h-screen bg-primary font-[Roboto]'>
          <App />

      </div>
    </BrowserRouter>
  </React.StrictMode>
);

