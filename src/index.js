import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard'

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
<Router history = {browserHistory}>
  <Route path = "/" component = {App}>
     <IndexRoute component = {Home} />
     <Route path = "home" component = {Home} />
     <Route path = "login" component = {Login} />
     <Route path = "signup" component = {Signup} />
     <Route path = "dashboard" component = {Dashboard} />
  </Route>
</Router>
	
), document.getElementById('root'));

registerServiceWorker();
