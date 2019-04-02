import React from "react";

import RouterWrapper from "../../components/RouterWrapper";
// import paths from "../paths";

import RegistrationPage from "./RegistrationPage";

const ROUTES = [
  {
    title: "Registration",
    route: {
      path: '/',
      component: RegistrationPage
    }
  }
];

export default function RegistrationRouter() {
  return <RouterWrapper paths={ROUTES} />;
}
