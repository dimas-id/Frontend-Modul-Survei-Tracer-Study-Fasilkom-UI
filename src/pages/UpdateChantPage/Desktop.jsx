import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantForm from "../../components/stables/ChantForm"
import Particle from "../../components/Particle";

import { layouts, fonts } from "../../styles/guidelines";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    ...layouts.pt16,
    ...layouts.pb16,
    ...layouts.mt64,
    ...layouts.ml16,
    ...layouts.mr16,
    ...layouts.mb64,
    width: "90vw",
    ...fonts.bold,
    ...layouts.borderBox
  },
  container:{
    ...layouts.flexMiddle
  }
});

class Screen extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth title="Screen" />
        <NavbarBack />
        <Container className={classes.container}>
        <Particle name="cloud2" left={0} />
        <Particle name="cloud1" right={0} bottom="15%" />
          <Paper className={classes.root} elevation={4}>
            <Typography variant="h5" component="h3">
              Mengubah Chant
            </Typography>
            <ChantForm />
          </Paper>
        </Container>
        </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({});

  return withAuth(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
