import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/auth/login';
import Navbar from './pages/panel/navbar';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/nav">
          <Navbar />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
