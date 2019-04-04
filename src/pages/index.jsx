import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Error404Page from "./Error404Page";
import ErrorPage from "./ErrorPage";
import CreateChantPage from "./CreateChantPage";
import RegistrationRouter from "./RegistrationRouter";
import ContactPage from "./ContactPage";
import EmailTemplateCreatePage from "./EmailTemplateCreatePage";
import DonationFormPage from "./DonationFormPage";
import DonationPage from "./DonationPage";
import DonationRequestPage from "./DonationRequestPage";
import PaymentPage from "./PaymentPage";
import UserDonationListPage from "./UserDonationListPage";
import ChannelRequestPage from "./ChannelRequestPage";
import ChannelRequestListPage from "./ChannelRequestListPage";
import ChannelRequestDetailPage from "./ChannelRequestDetailPage";
import ChannelRequestUpdatePage from "./ChannelRequestUpdatePage";
import ChannelChantPage from "./ChannelChantPage";
import UpdateChantPage from './UpdateChantPage';
import ChannelRouter from './ChannelRouter';

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
    title: "Donation Request List",
    route: {
      path: paths.DONATION_REQUEST,
      component: DonationRequestPage
    }
  },
  {
    title: "Riwayat Donasi",
    route: {
      path: paths.USER_DONATION_LIST,
      component: UserDonationListPage
    }
  },
  {
    title: "Detail Pembayaran",
    route: {
      path: paths.DONATION_PAYMENT_DETAIL,
      component: PaymentPage
    }
  },
  {
    title: "Create Chant",
    route: {
      path: paths.CHANNEL_CHANT_CREATE,
      component: CreateChantPage
    }
  },
  {
    title: "Update Chant",
    route: {
      path: paths.CHANNEL_CHANT_UPDATE,
      component: UpdateChantPage
    }
  },
  {
    title: "Form-Donasi",
    route: {
      path: paths.DONATION_FORM,
      component: DonationFormPage
    }
  },
  {
    title: "Donasi",
    route: {
      exact: true,
      path: paths.DONASI,
      component: DonationPage
    }
  },
  {
    title: "Registration",
    route: {
      path: paths.REGISTER,
      component: RegistrationRouter
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
    title: "Email Template Create",
    route: {
      path: paths.CRM_EMAIL_TEMPLATE_CREATE,
      component: EmailTemplateCreatePage
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
    title: "Channel Request List",
    route: {
      path: paths.CHANNEL_REQUEST_LIST,
      component: ChannelRequestListPage
    }
  },
  {
    title: "Channel Request Detail",
    route: {
      path: paths.CHANNEL_REQUEST_DETAIL,
      component: ChannelRequestDetailPage
    }
  },
  {
    title: "Channel Request Update",
    route: {
      path: paths.CHANNEL_REQUEST_UPDATE,
      component: ChannelRequestUpdatePage
    }
  },
  {
    title: "Channel Chant",
    route: {
      path: paths.CHANNEL_CHANT,
      component: ChannelChantPage
    }
  },
  {
    title: "Daftar Channel",
    route: {
      path: paths.CHANNEL,
      component: ChannelRouter
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
  }
];
