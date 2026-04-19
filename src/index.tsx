import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);
