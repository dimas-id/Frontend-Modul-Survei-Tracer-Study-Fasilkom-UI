import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import HomeOutlined from "@material-ui/icons/HomeOutlined";
import ContactMail from "@material-ui/icons/ContactMailOutlined";
import ToggleOff from "@material-ui/icons/ToggleOffOutlined";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import RouterWithMenu from "../../components/RouterWithMenu";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";

import paths from "../paths";

import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import PreferencePage from "./PreferencePage";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
  },
  particle: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

const ROUTES = [
  {
    title: "Beranda",
    menu: {
      Icon: HomeOutlined,
      path: paths.HOME,
    },
    route: {
      exact: true,
      path: paths.LANDING,
      component: HomePage,
    },
  },
  // {
  //   title: "Usulan Voting Alumni",
  //   menu: {
  //     Icon: HowToVoteIcon,
  //     path: paths.USER_VOTING
  //   },
  //   route: {
  //     exact: true,
  //     path: paths.VOTING,
  //     component: IframePage
  //   }
  // },
  // {
  //   title: "Hasil Voting Alumni",
  //   menu: {
  //     Icon: ShowChart,
  //     path: paths.USER_VOTING_RESULT
  //   },
  //   route: {
  //     exact: true,
  //     path: paths.VOTING_RESULT,
  //     component: VotingResultPage
  //   }
  // },
  {
    title: "Info Pribadi",
    menu: {
      Icon: ContactMail,
      path: paths.USER_PROFILE,
    },
    route: {
      exact: true,
      path: paths.PROFILE,
      component: ProfilePage,
    },
  },
  {
    title: "Preferensi",
    menu: {
      Icon: ToggleOff,
      path: paths.USER_PREFERENCE,
    },
    route: {
      exact: true,
      path: paths.PREFERENCE,
      component: PreferencePage,
    },
  },
];

function HomeMobile({ classes }) {
  return (
    <React.Fragment>
      <NavbarAuth />
      <Particle name="cloud2" left={0} top={160} />
      <Container className={classes.container}>
        <RouterWithMenu paths={ROUTES} />
      </Container>
    </React.Fragment>
  );
}

HomeMobile.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default authorize({
  mustVerified: false,
})(withStyles(styles)(HomeMobile));
