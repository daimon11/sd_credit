import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    container
  );
} else {
  console.error('Root container not found!');
}
