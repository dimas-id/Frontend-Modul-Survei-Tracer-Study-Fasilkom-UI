import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";

import Grid from "@material-ui/core/Grid";
import heliosV1 from "../../modules/api/helios/v1";
import { LinesLoader, LoadingFill } from "../../components/Loading";
import { getUser } from "../../modules/session/selectors";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import DonationCard from "../../components/stables/DonationCard";
import Particle from "../../components/Particle";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40
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
        this.setState({ donationProgramList: result.data.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  renderContent() {
    return (
      <Grid container>
        {this.state.donationProgramList.map(donation => (
          <Grid item xs={12} sm={4}>
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
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth title="Daftar Program Donasi" />
        <NavbarBackDonation />
        <Particle name="cloud2" left={0} top={160} />
        <Particle name="cloud1" right={0} top={400} />
        <Container className={classes.container}>
          {loading ? <LoadingFill /> : this.renderContent()}
        </Container>
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
