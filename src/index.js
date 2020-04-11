import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
