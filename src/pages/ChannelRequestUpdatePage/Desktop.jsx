import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { authorize, ROLES } from "../../components/hocs/auth";
import {
  NavbarAuth,
  NavbarBackForChannelRequest
} from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import ChannelRequestForm from "../../components/stables/ChannelRequestForm";
import heliosV1 from "../../modules/api/helios/v1";
import { getUserId } from "../../modules/session/selectors";
import { BulletList } from "react-content-loader";
import paths from "../../pages/paths";

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
    channelRequest: null,
    coverImgUrl: "",
    title: "",
    description: "",
    loading: true
  };

  componentDidMount() {
    const { channelId } = this.props.match.params;

    heliosV1.channel
      .getChannelRequestDetail(this.props.userId, channelId)
      .then(result => {
        if (!result.data.isRejected) {
          this.props.history.replace(paths.CHANNEL_REQUEST_LIST)
          window.notifySnackbar("Anda hanya dapat mengubah pengajuan yang ditolak", {
            variant: "error",
          });
        }
        this.setState({
          channelRequest: result.data,
          coverImgUrl: result.data.coverImgUrl,
          title: result.data.title,
          description: result.data.description,
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.replace(paths.ERROR_404);
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

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
    const { channelId } = this.props.match.params;
    const { userId, history } = this.props;
    heliosV1.channel
      .updateChannelRequest(
        userId,
        channelId,
        this.state.coverImgUrl,
        this.state.title,
        this.state.description
      )
      .then(({ data }) => {
        window.notifySnackbar(`Pembaruan Channel ${data.title} berhasil`, {
          variant: "success"
        });
        history.push(paths.CHANNEL_REQUEST_LIST);
      })
      .catch(() => {
        window.notifySnackbar(`Pembaruan Channel gagal`, { variant: "error" });
      });
  };

  render() {
    const { classes } = this.props;
    const { coverImgUrl, title, description, loading } = this.state;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackForChannelRequest />
        <Particle name="cloud2" left={0} top={160} />
        <Container>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Ubah Pengajuan Channel
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Perubahan Channel yang Anda ajukan akan diproses oleh Admin untuk
              dibuat
            </Typography>
            {loading ? (
              <BulletList />
            ) : (
              <ChannelRequestForm
                coverImgUrl={coverImgUrl}
                title={title}
                description={description}
                onChangeCoverImgUrl={this.handleCoverImgUrl.bind(this)}
                onChangeTitle={this.handleTitle.bind(this)}
                onChangeDescription={this.handleDescription.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                type="update"
              />
            )}
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    userId: getUserId(state)
  });

  return authorize({ mustVerified: true, roles: [ROLES.PUBLIC] })(
    withRouter(
      connect(
        mapStateToProps,
        null
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
