import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import HomeOutlined from "@material-ui/icons/HomeOutlined";
import ContactMail from "@material-ui/icons/ContactMailOutlined"
import ToggleOff from "@material-ui/icons/ToggleOffOutlined"

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import RouterWithMenu from "../../components/RouterWithMenu";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import PreferencePage from "./PreferencePage";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40
  }
});

const ROUTES = [
  {
    title: "Beranda",
    menu: {
      Icon: HomeOutlined,
      path: "/home"
    },
    route: {
      exact: true,
      path: "/",
      component: HomePage
    }
  },
  {
    title: "Info Pribadi",
    menu: {
      Icon: ContactMail,
      path: "/home/profile"
    },
    route: {
      exact: true,
      path: "/profile",
      component: ProfilePage
    }
  },
  {
    title: "Preferensi",
    menu: {
      Icon: ToggleOff,
      path: "/home/preferensi"
    },
    route: {
      exact: true,
      path: "/preferensi",
      component: PreferencePage
    }
  }
];

function HomeMobile({ classes }) {
  return (
    <React.Fragment>
      <NavbarAuth />
      <Particle name="cloud2" left={0} top={160} />
      <div className={classes.container}>
        <RouterWithMenu paths={ROUTES} />
      </div>
    </React.Fragment>
  );
}

HomeMobile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withAuth(withStyles(styles)(HomeMobile));
