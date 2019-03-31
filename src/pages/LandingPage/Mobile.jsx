import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import Particle from "../../components/Particle";

import { Guidelines } from "../../styles";
import paths from "../paths";

const styles = theme => ({
  hero: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.windowHeight
  },
  heroTextContainer: {
    ...Guidelines.layouts.flex1
  },
  contentContainer: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.windowHeight
  },
  title: {
    ...Guidelines.fonts.heading1
  },
  subtitle: {
    fontSize: 24
  },
  heroButtonContainer: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flex1
  },
  buttonDaftar: {
    width: 400,
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000"
    }
  },
  bgLanding: {
    width: "100%"
  }
});

function LandingMobile({ classes }) {
  return (
    <React.Fragment>
      <NavbarAuth position="fixed" />
      <Particle name="cloud2" left={0} top={160} />
      <Container>
        <div className={classes.hero}>
          <div className={classes.heroTextContainer}>
            <Typography component="h1" variant="h3" className={classes.title}>
              Bergabung dengan layanan ILUNI12 Channel
            </Typography>
            <Typography
              component="subtitle1"
              paragraph
              className={classes.subtitle}
            >
              ILUNI12 Channel akan mewadahi para alumni untuk menyalurkan salah
              satu bentuk kepedulian sosial serta mewadahi para alumni untuk
              saling berinteraksi
            </Typography>
          </div>
          <div className={classes.heroButtonContainer}>
            <Button
              component={Link}
              to={paths.REGISTER}
              className={classes.buttonDaftar}
              size="large"
            >
              Daftar
            </Button>
          </div>
        </div>
      </Container>
      <div style={{ position: "relative" }}>
        <Particle
          name="bgLanding"
          top={-500}
          style={{ ...Guidelines.layouts.windowWidth }}
        />
        <Container className={classes.contentContainer}>
          <Typography component="h1" variant="h2" className={classes.title}>
            Donasi
          </Typography>
        </Container>
      </div>
      <Container className={classes.contentContainer}>
        <div className={classes.heroTextContainer}>
          <Typography component="h1" variant="h2" className={classes.title}>
            Channel
          </Typography>
          <Typography
            component="subtitle1"
            paragraph
            className={classes.subtitle}
          >
            Sarana bertukar informasi antar pengguna yang disajikan dengan
            berbagai kategori
          </Typography>
        </div>
        <div style={{ ...Guidelines.layouts.flex1 }} />
        <Particle name="cloudChannel" right={0} top={200} />
      </Container>
    </React.Fragment>
  );
}

LandingMobile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LandingMobile);
