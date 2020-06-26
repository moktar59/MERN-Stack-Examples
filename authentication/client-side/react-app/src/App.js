import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Signin from './components/signin';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/signin"}>NavBar Brand</Link>
          <div  className="collapse navbar-collapse" id="navbarTogglerDemo02"> 
            <ul  className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>Signin</Link>
              </li>
              <li className="navbar-nav ml-auto">
                <Link className="nav-link" to={"/signup"}>Signup</Link>
              </li>
            </ul>
          </div>
        </div>        
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Signin}/>
            <Route path="/signin" component={Signin}/>
            <Router path="/signup" component={Signup}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
