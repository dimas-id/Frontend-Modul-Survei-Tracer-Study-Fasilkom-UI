import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container, ContainerFluid } from "../../components/Container";
import { Guidelines } from "../../styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  
  paper: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr64,
    ...Guidelines.layouts.pl64,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
  },
  gridPaper: {
    ...Guidelines.layouts.flexMiddle
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <ContainerFluid>
        <NavbarAuth title="Screen" />
        <Container className={classes.container}>
          <Grid container spacing={24} className={classes.gridPaper}>
            <Grid item xs={6} sm={6} >
              <Paper className={classes.paper}>
                  <Paper >
                  <Typography gutterBottom variant="h5" component="h2">
                    dalem
                  </Typography>


                  </Paper>
                  <Typography gutterBottom variant="h5" component="h2">
                    Donasi [belum dikonekin]
                  </Typography>
                  <Typography component="p">
                    ini adalah donasi untuk [belum diisi]
                  </Typography>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Lihat Riwayat Donasi
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ContainerFluid>
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
