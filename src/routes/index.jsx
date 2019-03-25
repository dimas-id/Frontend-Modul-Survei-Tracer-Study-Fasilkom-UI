import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import paths from "./paths";

export default function Routing() {
  return (
    <BrowserRouter>
      <Switch>
        {ROUTES.map(item => (
          <Route {...item.route} key={item.route.path} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

const ROUTES = [
  {
    title: "Home",
    route: {
      exact: true,
      path: paths.HOME,
      component: HomeScreen
    }
  },
  {
    title: "Login",
    route: {
      path: paths.LOGIN,
      component: LoginScreen
    }
  }
];
