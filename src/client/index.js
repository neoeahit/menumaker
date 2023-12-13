import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App.js';

import './index.css';

const root = createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#A62722',
    },
    secondary: {
      main: '#CAC6A0',
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
