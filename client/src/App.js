import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Nav from './components/Nav';

const App = () => (
  <Router>
    <Nav />
    <hr />
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/dashboard">
        <DashboardPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
    </Switch>
  </Router>
);

export default App;
