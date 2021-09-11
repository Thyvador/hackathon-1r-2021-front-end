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
import ConnectionPage from "pages/LoginPage";
import authService from "services/auth.service";
import UserAccountPage from "pages/UserAccountPage";
import DetailsPage from "pages/DetailsPage";
import TrackAndTracePage from "pages/TrackAndTracePage";

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

      <Route path="/companies/:company/pieces/:id/trace">
        <TrackAndTracePage />
      </Route>

      <Route path="/companies/:company/pieces/:id">
        <DetailsPage />
      </Route>

      <Route path="/login">
        <ConnectionPage />
      </Route>

      <Route path="/">
        <QrCodeScannerPage />
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
