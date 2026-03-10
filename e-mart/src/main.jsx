import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import { CartProvider } from './stores/context/CartContext'
import { UserProvider } from './stores/context/UserContext'
import { ThemeProvider } from './stores/context/ThemeContext'

console.log('main.jsx executing')

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Missing <div id="root"> in public/index.html')
createRoot(rootEl).render(
  <BrowserRouter>
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
)
