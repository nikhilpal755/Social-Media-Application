import React from "react";
import Home from "./pages/Home/home.jsx";
import Profile from "./pages/Profile/profile";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Chat from "./pages/Chat/Chat.jsx";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";

import { AuthContext } from "./context/authContext";
import { useContext } from "react";
// import { Redirect } from "react-router";



function App() {

  const {user} = useContext(AuthContext);
  return(
  <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home/> : <Register/>}
      </Route>
      <Route path="/register">
         { user ? <Redirect to="/" /> : <Register/>}
      </Route>
      <Route path="/login">
        { user ? <Redirect to="/" /> :  <Login/> }
      </Route>
      <Route path="/profile/:username">
        { user ? <Profile/> : <Register/>}
      </Route>
      <Route path="/chat"> <Chat/> </Route>
    </Switch>
  </Router>
  )


}

export default App;
