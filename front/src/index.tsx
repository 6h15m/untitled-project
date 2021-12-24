import axios from 'axios';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import GlobalStyle from './assets/styles/global-styles';

dotenv.config();
axios.defaults.baseURL = `http://localhost:${process.env.REACT_APP_BACK_PORT}`;

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <App />
  </Router>,
  document.getElementById('root'),
);
