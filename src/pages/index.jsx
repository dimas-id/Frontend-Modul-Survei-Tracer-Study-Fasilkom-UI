import React from "react";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import LandingPage from "./LandingPage";
import HomeRouter from "./HomeRouter";
import LoginPage from "./LoginPage";
import Error404Page from "./Error404Page";
import ErrorPage from "./ErrorPage";
import CreateChantPage from "./CreateChantPage";
import RegisterExternalAuthPage from "./RegisterExternalAuthPage";
import RegistrationRouter from "./RegistrationRouter";
import ContactPage from "./ContactPage";
import EmailBlasterPage from "./EmailBlasterPage";
import EmailTemplateCreatePage from "./EmailTemplateCreatePage";
import EmailTemplateUpdatePage from "./EmailTemplateUpdatePage";
import EmailTemplateListPage from "./EmailTemplateListPage";
import EmailBatchCreatePage from "./EmailBatchCreatePage";
import EmailBatchUpdatePage from "./EmailBatchUpdatePage";
import ChannelRequestPage from "./ChannelRequestPage";
import ChannelRequestListPage from "./ChannelRequestListPage";
import ChannelRequestDetailPage from "./ChannelRequestDetailPage";
import ChannelRequestUpdatePage from "./ChannelRequestUpdatePage";
import ChannelChantPage from "./ChannelChantPage";
import UpdateChantPage from "./UpdateChantPage";
import ChannelRouter from "./ChannelRouter";
import ChannelChantDetailPage from "./ChannelChantDetailPage";
import UserVerifyPage from "./UserVerifyPage";

import { history } from '../modules';

import paths from "./paths";

export default function Pages() {
  return (
    <Router history={history}>
      <Switch>
        {ROUTES.map(({ title, route }) => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={() => (
              <React.Fragment>
                <Helmet>
                  <title>{title}</title>
                </Helmet>
                <route.component />
              </React.Fragment>
            )}
          />
        ))}
        <Route
            render={() => (
              <React.Fragment>
                <Helmet>
                  <title>404</title>
                </Helmet>
                <Error404Page/>
              </React.Fragment>
            )}
          />
      </Switch>
    </Router>
  );
}

const ROUTES = [
  {
    title: "ILUNI12",
    route: {
      exact: true,
      path: paths.LANDING,
      component: LandingPage,
    },
  },
  {
    title: "Verifikasi Pengguna",
    route: {
      path: paths.USER_VERIFY,
      component: UserVerifyPage,
    },
  },
  {
    title: "Beranda",
    route: {
      path: paths.HOME,
      component: HomeRouter,
    },
  },
  {
    title: "Login",
    route: {
      path: paths.LOGIN,
      component: LoginPage,
    },
  },
  {
    title: "Registrasi",
    route: {
      path: paths.REGISTER,
      component: RegistrationRouter,
    },
  },
  {
    title: "External auth",
    route: {
      path: paths.REGISTER_EXTERNAL,
      component: RegisterExternalAuthPage,
    },
  },
  {
    title: "CRM",
    route: {
      path: paths.CRM,
      component: () => <Redirect to={paths.CRM_MAILER} />,
      exact: true,
    },
  },
  {
    title: "Contact",
    route: {
      path: paths.CRM_CONTACT,
      component: ContactPage,
    },
  },
  {
    title: "Email Blaster",
    route: {
      path: paths.CRM_MAILER,
      component: EmailBlasterPage,
      exact: true,
    },
  },
  {
    title: "Membuat Batch",
    route: {
      path: paths.CRM_EMAIL_BATCH_CREATE,
      component: EmailBatchCreatePage,
    },
  },
  {
    title: "Mengubah Batch",
    route: {
      path: paths.CRM_EMAIL_BATCH_UPDATE,
      component: EmailBatchUpdatePage,
    },
  },
  {
    title: "Email Template List",
    route: {
      exact: true,
      path: paths.CRM_EMAIL_TEMPLATE_LIST,
      component: EmailTemplateListPage,
    },
  },
  {
    title: "Email Template Create",
    route: {
      exact: true,
      path: paths.CRM_EMAIL_TEMPLATE_CREATE,
      component: EmailTemplateCreatePage,
    },
  },
  {
    title: "Email Template Update",
    route: {
      exact: true,
      path: paths.CRM_EMAIL_TEMPLATE_UPDATE,
      component: EmailTemplateUpdatePage,
    },
  },
  {
    title: "Channel Request",
    route: {
      exact: true,
      path: paths.CHANNEL_REQUEST,
      component: ChannelRequestPage,
    },
  },
  {
    title: "Channel Request List",
    route: {
      path: paths.CHANNEL_REQUEST_LIST,
      component: ChannelRequestListPage,
    },
  },
  {
    title: "Channel Request Detail",
    route: {
      exact: true,
      path: paths.CHANNEL_REQUEST_DETAIL,
      component: ChannelRequestDetailPage,
    },
  },
  {
    title: "Channel Request Update",
    route: {
      path: paths.CHANNEL_REQUEST_UPDATE,
      component: ChannelRequestUpdatePage,
    },
  },
  {
    title: "Daftar Channel",
    route: {
      exact: true,
      path: paths.CHANNEL,
      component: ChannelRouter,
    },
  },
  {
    title: "Create Chant",
    route: {
      path: paths.CHANNEL_CHANT_CREATE,
      component: CreateChantPage,
    },
  },
  {
    title: "Update Chant",
    route: {
      path: paths.CHANNEL_CHANT_UPDATE,
      component: UpdateChantPage,
    },
  },
  {
    title: "Channel Chant",
    route: {
      exact: true,
      path: paths.CHANNEL_CHANT,
      component: ChannelChantPage,
    },
  },
  {
    title: "Detail Chant",
    route: {
      path: paths.CHANNEL_CHANT_DETAIL,
      component: ChannelChantDetailPage,
    },
  },
  {
    title: "Daftar Channel",
    route: {
      path: paths.CHANNEL,
      component: ChannelRouter,
    },
  },
  {
    title: "Err...",
    route: {
      path: paths.ERROR,
      component: ErrorPage,
    },
  },
  {
    title: "404",
    route: {
      path: paths.ERROR_404,
      component: Error404Page,
    },
  },
];
