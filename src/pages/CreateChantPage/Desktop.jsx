import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container, ContainerFluid } from "../../components/Container";
import Particle from "../../components/Particle";
import AttachmentIcon from "@material-ui/icons/Attachment";

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
  form: {
    ...layouts.flexDirCol
  },
  formInline: {
    ...layouts.mt16,
    ...layouts.flexDirRow,
    justifiyContent: "space-between"
  },
  textField: {
    ...layouts.w100,
    width: "75vw"
  },
  label: {
    ...layouts.marginAuto
  },
  button: {
    ...layouts.marginAuto,
    width: "10vw"
  },
  buttonPic: {
    ...layouts.marginAuto
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
              Membuat Chant
            </Typography>
            <form className={classes.form}>
              <div className={classes.formInline}>
                <label className={classes.label} for="title">
                  Judul
                </label>
                <TextField
                  autoFocus
                  id="title"
                  label="Judul Chant hari ini?"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </div>
              <div className={classes.formInline}>
                <label className={classes.label} for="description">
                  Deskripsi
                </label>
                <TextField
                  id="descritpion"
                  label="Deskripsi Chant hari ini?"
                  multiline
                  rowsMax="5"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </div>
              <div className={classes.formInline}>
                <Button
                  className={classes.buttonPic}
                >
                <AttachmentIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Chant!
                </Button>
              </div>
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
