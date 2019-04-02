import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from './LandingPage';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Error404Page from "./Error404Page";
import ErrorPage from './ErrorPage';
import ChannelRequestPage from './ChannelRequestPage';
import ContactPage from "./ContactPage";

import paths from "./paths";

export default function Pages() {
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
    title: "ILUNI12",
    route: {
      exact: true,
      path: paths.LANDING,
      component: LandingPage
    }
  },
  {
    title: "Home",
    route: {
      exact: true,
      path: paths.HOME,
      component: HomePage
    }
  },
  {
    title: "Login",
    route: {
      path: paths.LOGIN,
      component: LoginPage
    }
  },
  {
    title: "Channel Request",
    route: {
      path: paths.CHANNEL_REQUEST,
      component: ChannelRequestPage
    }
  },
  {
    title: "Contact",
    route: {
      path: paths.CRM_CONTACT,
      component: ContactPage
    }
  },
  {
    title: "Err...",
    route: {
      path: paths.ERROR,
      component: ErrorPage
    }
  },
  {
    title: "404",
    route: {
      path: paths.ERROR_404,
      component: Error404Page
    }
  },
  {
    title: "404",
    route: {
      path: "",
      component: Error404Page
    }
  }
];
