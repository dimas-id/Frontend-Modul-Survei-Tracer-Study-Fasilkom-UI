import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    fontSize: 16
  },
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 42,
    width: 800
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 20,
    ...Guidelines.fonts.bold
  },
  textField: {
    width: 800
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn:{
    ...Guidelines.layouts.mt64,
    width: 120
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Ajukan Sebuah Channel
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Channel yang Anda ajukan akan diproses oleh Admin untuk dibuat
            </Typography>

            <form className={classes.form}>
              <Grid container spacing={24}>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Gambar *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Placeholder"
                    type="text"
                    name="judul"
                    autoComplete="judul"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Judul *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Judul Channel yang diajukan"
                    type="text"
                    name="judul"
                    autoComplete="judul"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Deskripsi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Deskripsi Channel yang diajukan"
                    type="text"
                    name="deskripsi"
                    autoComplete="deskripsi"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </form>
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
