import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Tooltip from '@radix-ui/react-tooltip';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Tooltip.TooltipProvider delayDuration={200}>
    <App /></Tooltip.TooltipProvider>
  </React.StrictMode>
);
