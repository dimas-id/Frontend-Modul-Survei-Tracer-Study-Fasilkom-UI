import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {authorize, ROLES} from "../../components/hocs/auth";
import {
  NavbarAuth,
  NavbarBack,
} from "../../components/stables/Navbar";
import {Container} from "../../components/Container";
import {Guidelines} from "../../styles";
import Particle from "../../components/Particle";
import ChannelRequestForm from "../../components/stables/ChannelRequestForm";
import heliosV1 from "../../modules/api/helios/v1";
import {getUserId} from "../../modules/session/selectors";

import paths from "../paths";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    coverImgUrl: "",
    title: "",
    description: "",
  };

  handleCoverImgUrl({data, status}) {
    if (status === 201) {
      this.setState({
        coverImgUrl: data.fileUrl,
      });
    }
  }

  handleTitle({target}) {
    this.setState({
      title: target.value,
    });
  }

  handleDescription({target}) {
    this.setState({
      description: target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {userId, history} = this.props;

    heliosV1.channel
      .createChannelRequest(
        userId,
        this.state.coverImgUrl,
        this.state.title,
        this.state.description
      )
      .then(({data}) => {
        window.notifySnackbar(
          `Pengajuan Channel '${data.title}' berhasil dibuat`,
          {variant: "success"}
        );
        history.push(paths.CHANNEL_REQUEST_LIST);
      })
      .catch(() => {
        window.notifySnackbar("Pengajuan Channel gagal dibuat", {
          variant: "error",
        });
      });
  };

  render() {
    const {classes} = this.props;
    const {coverImgUrl, title, description} = this.state;

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
            <ChannelRequestForm
              coverImgUrl={coverImgUrl}
              title={title}
              description={description}
              onChangeCoverImgUrl={this.handleCoverImgUrl.bind(this)}
              onChangeTitle={this.handleTitle.bind(this)}
              onChangeDescription={this.handleDescription.bind(this)}
              onSubmit={this.handleSubmit}
              type="create"
            />
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    userId: getUserId(state),
  });

  return authorize({mustVerified: true, roles: [ROLES.PUBLIC]})(
    withRouter(
      connect(
        mapStateToProps,
        null
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
