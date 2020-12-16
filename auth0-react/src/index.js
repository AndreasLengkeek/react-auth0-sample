import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

console.log(window.location.origin);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sswrulestest.au.auth0.com"
      clientId="n0fXmSe4bvA9oOHCS0lreq6FyrTAAHGk"
      audience="https://functions.sample"
      redirectUri={window.location.origin}
      scope="openid email profile"
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
