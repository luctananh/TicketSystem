import { StrictMode } from 'react'
// import React from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import './styles/login.style.css'

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>,
  <StrictMode>
    <App />
  </StrictMode>,
)

