import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import './App.css';
import { darkTheme, lightTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App></App>
    </ThemeProvider>
  </React.StrictMode>
);