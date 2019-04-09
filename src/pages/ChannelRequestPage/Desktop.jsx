import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBackForChannelRequest } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";
import Particle from "../../components/Particle";
import ChannelRequestForm from "../../components/stables/ChannelRequestForm";
import paths from "../paths";
import { makePathVariableUri } from "../../libs/navigation";
import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";

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
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    coverImgUrl: "",
    title: "",
    description: ""
  };

  handleCoverImgUrl({ data, status }) {
    if (status === 201) {
      this.setState({
        coverImgUrl: data.fileUrl
      });
    }
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleDescription({ target }) {
    this.setState({
      description: target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user.id;
    heliosV1.channel
      .createChannelRequest(
        userId,
        this.state.coverImgUrl,
        this.state.title,
        this.state.description
      )
      .then(this.handleOpenSuccessMsg)
      .catch(this.handleOpenErrorMsg);
  };

  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };
  handleOpenErrorMsg = () => {
    this.setState({ openErrorMsg: true });
  };

  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { user, classes } = this.props;
    const { coverImgUrl, title, description } = this.state;
    const action = (
      <Button
        component={Link}
        to={makePathVariableUri(paths.CHANNEL_REQUEST_LIST, {
          userId: user.id
        })}
        backgroundColor="white"
        size="small"
      >
        Riwayat Pengajuan Channel
      </Button>
    );

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackForChannelRequest />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Ajukan Sebuah Channel
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Channel yang Anda ajukan akan diproses oleh Admin untuk dibuat
            </Typography>
            <ChannelRequestForm
              coverImgUrl={coverImgUrl}
              title={title}
              description={description}
              onChangeCoverImgUrl={this.handleCoverImgUrl.bind(this)}
              onChangeTitle={this.handleTitle.bind(this)}
              onChangeDescription={this.handleDescription.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
              type="create"
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
            message={`Pengajuan Channel berhasil dibuat`}
            action={action}
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
            message={`Pengajuan Channel gagal dibuat`}
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
