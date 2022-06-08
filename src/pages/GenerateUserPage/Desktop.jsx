import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { authorize, ROLES } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import Typography from "@material-ui/core/Typography";
import FetchForm from "./FetchForm";
import SisidangDataList from "./SisidangDataList";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    paddingLeft: 200,
    paddingRight: 200,
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    semester: "",
    tahun: "",
    triggerFetch: false,
  };

  handleChange = ({ target }) => {
    const re = /^[0-9]+$/;
    switch (target.id || target.name) {
      case "semester":
        this.setState({
          semester: target.value,
        });

        if (target.value === "") {
          this.setState({
            tahun: target.value,
          });
        }
        break;

      case "tahun":
        if (target.value === "" || re.test(target.value)) {
          this.setState({
            tahun: target.value,
          });
        }
        break;

      default:
    }
  };

  handleFetch = () => {
    this.setState({
      triggerFetch: !this.state.triggerFetch,
    });
  };

  render() {
    const { classes } = this.props;
    const { semester, tahun } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Generate User" />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />

        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item className={classes.item} xs={12} sm={12}>
              <Typography className={classes.title} variant="h5" component="h3">
                Periode Sidang
              </Typography>
            </Grid>
            <FetchForm
              semester={semester}
              tahun={tahun}
              handleChange={this.handleChange}
              handleFetch={this.handleFetch}
            />
            <SisidangDataList query={this.state} />
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF, ROLES.PUBLIC],
  })(withRouter(withStyles(styles)(Screen)));
}

export default createContainer();
