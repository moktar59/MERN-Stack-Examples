import React, {useState, useEffect} from 'react';
import UserContext from './context/userContext';
import Axios from 'axios';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from "./components/layouts/header";
import Home from "./components/pages/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

import "./style.css";


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:8081/users/tokenIsValid",
        null,
        { 
          headers: { "x-auth-token": token}
        }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8081/users/user", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}
