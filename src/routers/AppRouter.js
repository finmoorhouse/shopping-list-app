import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import Add from "../components/Add";
import List from "../components/List";
import NotFoundPage from "../components/NotFoundPage";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
    <Switch>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/add" component={Add} />
      <Route path="/view" component={List} />
      <Route component={NotFoundPage} />
    </Switch>
    </div>
  </Router>
);

export default AppRouter;
