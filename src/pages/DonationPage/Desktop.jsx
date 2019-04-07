import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";

import DonationCard from "./DonationCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import heliosV1 from "../../modules/api/helios/v1";
import { LinesLoader, LoadingFill } from "../../components/Loading";
import paths from "../paths";
import { getUser } from "../../modules/session/selectors";
import { makePathVariableUri } from "../../libs/navigation";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };
  state = {
    donationProgramList: null,
    loading: true
  };
  componentDidMount() {
    heliosV1.donation
      .getDonationProgramList()
      .then(result => {
        console.log(result.data)
        this.setState({ donationProgramList: result.data.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  renderContent() {
    return (
      <Grid container spacing={24}>
        {this.state.donationProgramList.map(donation => (
          <Grid item xs={4}>
            <DonationCard {...donation} />
          </Grid>
        ))}
      </Grid>
    );
  }
  render() {
    const { loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const { classes, user } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth />
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Donasi
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Halaman program donasi
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      href={paths.DONATION_REQUEST}
                    >
                      Ajukan Program Donasi
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={makePathVariableUri(paths.USER_DONATION_LIST, {
                        username: user.username
                      })}
                    >
                      Riwayat Donasi
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={makePathVariableUri(paths.USER_DONATION_REQUEST_LIST, {
                        username: user.username
                      })}
                    >
                      Riwayat Program Donasi
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </main>
        {loading ? <LoadingFill /> : this.renderContent()}
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state)
  });

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
