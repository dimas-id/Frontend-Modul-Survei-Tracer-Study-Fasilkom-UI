import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantForm from "../../components/stables/ChantForm"
import Particle from "../../components/Particle";

import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";

import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";

import { layouts } from "../../styles/guidelines";

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
    ...layouts.borderBox
  },
  container:{
    ...layouts.flexMiddle
  }
});

class Screen extends React.PureComponent {
  state = {
    title: "",
    body: "",
    parentChant: null
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody( target ) {
    this.setState({
      body: target
    });
  }

  componentDidMount(){
    if(Boolean(this.props.location.state)){
      this.setState({ parentChant: this.props.location.state.parentId})
    }
  }
  handleSubmit() {
    heliosV1.channel
      .postChant(
        this.props.user.id,
        this.props.match.params.channelId,
        this.state.parentChant,
        this.state.title,
        this.state.body
      )
      .then(this.handleOpenSuccessMsg)
      .catch(this.handleOpenErrorMsg)
  }

  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = ( reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };

  handleOpenErrorMsg = () => {
    this.setState({ openErrorMsg: true });
  };

  handleCloseErrorMsg = ( reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { classes } = this.props;
    const { title, body } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} />
        <Particle name="cloud1" right={0} bottom="15%" />
        <Container className={classes.container}>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="h5" component="h3">
              Membuat Chant
            </Typography>
            <ChantForm 
            title={title}
            body={body}
            onChantTitle={this.handleTitle.bind(this)}
            onChangeBody={this.handleBody.bind(this)}
            onSubmit={this.handleSubmit.bind(this)}
            />
          </Paper>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccessMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccessMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSuccessMsg}
            variant="success"
            message={`Chant berhasil dibuat`}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openErrorMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={`Chant gagal dibuat`}
          />
        </Snackbar>
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
