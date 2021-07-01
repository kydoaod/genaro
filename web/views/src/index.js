import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import './index.css';
import App from './App';
import Login from './page/Login/Login';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  
  <Router>
    <div>
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/linkedin" component={LinkedInPopUp} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
