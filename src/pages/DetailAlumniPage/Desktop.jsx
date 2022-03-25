import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { LoadingFill } from "../../components/Loading";
import { authorize, ROLES } from "../../components/hocs/auth";
import Grid from "@material-ui/core/Grid";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import { withStyles } from "@material-ui/styles";
import atlasV1 from "../../modules/api/atlas/v1";
import AlumniCard from "./AlumniCard";
import paths from "../../pages/paths";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";



const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    alumni: null,
    loading: true,
  };

  componentDidMount() {
    const { idAlumni } = this.props.match.params;
    atlasV1.detailAlumni
      .getAlumniDetail(idAlumni)
      .then(result => {
        this.setState({ alumni: result.data });
      })
      .finally(() => {
          this.setState({ loading: false });
        })
  }

  render() {
    const { classes } = this.props;
    const { loading, alumni } = this.state;
    console.log(alumni) //TODO: hapus kalau udah ga perlu

    return (
      <React.Fragment>
        <NavbarAuth title="Detail Alumni" />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                component={Link}
                to={paths.ALUMNI_SEARCH}
                style={{position: "fixed"}}
              >
                <ArrowBack />
              </IconButton>
              {loading && (
                <React.Fragment>
                  <LoadingFill />
                </React.Fragment>
              )}
              {!loading && (
                <React.Fragment>
                  <center>
                    <AlumniCard alumni={alumni} />
                  </center>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF, ROLES.PUBLIC],
  })(
    withRouter(
      connect(mapStateToProps)(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();