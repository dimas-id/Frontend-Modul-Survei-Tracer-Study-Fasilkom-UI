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
    loading: true
  }

  componentDidMount() {
    heliosV1.channel
    .getChantDetail(this.props.user.id, this.props.match.params.chantId)
      .then(result => {
        console.log(result)
        this.setState({
          title: result.data.title,
          body: result.data.body
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody({ target }) {
    this.setState({
      body: target.value
    });
  }

  handleSubmit() {
    heliosV1.channel
      .updateChant(
        this.props.user.id,
        this.props.match.params.chantId,
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
        <NavbarAuth title="Screen" />
        <NavbarBack />
        <Container className={classes.container}>
        <Particle name="cloud2" left={0} />
        <Particle name="cloud1" right={0} bottom="15%" />
          <Paper className={classes.root} elevation={4}>
            <Typography variant="h5" component="h3">
              Mengubah Chant
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
            message={`Chant berhasil diubah`}
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
            message={`Chant gagal diubah`}
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
