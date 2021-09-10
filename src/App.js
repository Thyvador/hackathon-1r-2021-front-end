import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import QrCodeScannerPage from "pages/QrCodeScannerPage";
import MainPage from "pages/MainPage";
import PiecePage from "pages/PiecePage";
import ConnectionPage from "pages/ConnectionPage";
import authService from "services/auth.service";
import UserAccountPage from "pages/UserAccountPage";

const RouterContainer = () => {
  const location = useLocation();

  return (
    <Switch>
      {!authService.isUserLoggedIn() && location.pathname !== "/login" && (
        <Redirect to="/login" />
      )}

      <Route path="/login">
        <ConnectionPage />
      </Route>

      <Route path="/user-config">
        <UserAccountPage />
      </Route>

      <Route path="/qr-code-scanner">
        <QrCodeScannerPage />
      </Route>

      <Route path="/companies/:company/pieces/:id">
        <PiecePage />
      </Route>

      <Route path="/login">
        <ConnectionPage />
      </Route>

      <Route path="/">
        <MainPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  return (
    <Router>
      <RouterContainer />
    </Router>
  );
};

export default App;
