import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QrCodeScannerPage from "pages/QrCodeScannerPage";
import { Button } from "@material-ui/core";
import MainPage from "pages/MainPage";
import PiecePage from "pages/PiecePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/qr-code-scanner">
          <QrCodeScannerPage />
        </Route>

        <Route path="/pieces/:id">
          <PiecePage />
        </Route>

        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;