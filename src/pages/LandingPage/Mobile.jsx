import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import Particle from "../../components/Particle";
import LinkedInButton from "../../components/stables/LinkedInButton";

import { Guidelines } from "../../styles";
import paths from "../paths";

const styles = theme => ({
  hero: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.windowHeight,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.borderBox,
    ...Guidelines.layouts.flexWrap,
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.pt40
    }
  },
  heroTextContainer: {
    ...Guidelines.layouts.flex1
  },
  contentContainer: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.windowHeight,
    ...Guidelines.layouts.pt64,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pr32
  },
  title: {
    ...Guidelines.fonts.heading1
  },
  subtitle: {
    fontSize: 24
  },
  heroButtonContainer: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flex1,
    ...Guidelines.layouts.flexDirCol
  },
  link: {
    color: "00C7E5",
    ...Guidelines.fonts.bold,
    ...Guidelines.layouts.mr24,
    ...Guidelines.layouts.ml24
  },
  btn: {
    width: 360
  },
  btnGrid: {
    margin: "auto",
    width: "100%"
  },
  buttonDaftar: {
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
            <Typography component="p" paragraph className={classes.subtitle}>
              ILUNI12 Channel akan mewadahi para alumni untuk menyalurkan salah
              satu bentuk kepedulian sosial serta mewadahi para alumni untuk
              saling berinteraksi
            </Typography>
          </div>
          <div className={classes.heroButtonContainer}>
            <Grid container spacing={24} className={classes.btnGrid}>
              <Grid item xs={12}>
                <Button
                  component={Link}
                  to={paths.REGISTER}
                  className={`${classes.buttonDaftar} ${classes.btn}`}
                  size="large"
                >
                  Daftar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <LinkedInButton size="large" className={classes.btn}>
                  Daftar dengan LinkedIn
                </LinkedInButton>
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">
                  Sudah memiliki akun ILUNI12 Channel?
                  <Link to={paths.LOGIN} className={classes.link}>
                    Masuk
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
      <div style={{ position: "relative" }}>
        <Particle
          name="bgLanding"
          top={-500}
          style={{ ...Guidelines.layouts.w100, zIndex: -11 }}
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
          <Typography component="p" paragraph className={classes.subtitle}>
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
