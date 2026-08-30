// ============================================================
// main.jsx
// ------------------------------------------------------------
// PURPOSE: The actual entry point Vite/React boots from. It
// mounts <App /> into the #root DOM node and wraps it with the
// two "providers" the app needs everywhere:
//   - BrowserRouter    -> enables react-router-dom routing
//   - SnackbarProvider -> enables the toast/snackbar notifications
//                         used throughout the app (e.g. "Book
//                         created successfully")
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';


// Find the <div id="root"> in index.html and render our app into it.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
)