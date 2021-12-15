import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './assets/styles/global-styles';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <App />
  </Router>,
  document.getElementById('root'),
);
