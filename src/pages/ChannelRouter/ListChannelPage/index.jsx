import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Guidelines } from "../../../styles";

import heliosV1 from "../../../modules/api/helios/v1";

import { Container } from "../../../components/Container";
import { withAuth } from "../../../components/hocs/auth";
import { LoadingFill } from "../../../components/Loading";

import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";

import ChannelCard from "./ChannelCard";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.mb8,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pb24,
    ...Guidelines.layouts.borderBox
  },
  chantWrapper: {
    maxHeight: 64,
    lineHeight: 64,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  actions: {
    display: "flex",
    ...Guidelines.layouts.flexDirCol,
    alignItems: "flex-start"
  }
});

class Screen extends React.Component {
  state = {
    listChannel: null,
    isLoading: true
  };

  renderListChannel() {
    const { listChannel } = this.state;

    return (
      <React.Fragment>
        {listChannel.map(channel => (
          <Grid item xs={4}>
          <Link to={makePathVariableUri(paths.CHANNEL_CHANT, {
                      channelId: channel.id
                    })}>
            <ChannelCard
              key={channel.id}
              title={channel.title}
              coverImgUrl={channel.coverImgUrl}
            />
          </Link>
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  componentDidMount() {
    heliosV1.channel
      .getListChannel()
      .then(result => {
        this.setState({ listChannel: result.data.results });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    return (
      <Container className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Daftar Channel
        </Typography>
        <Grid container spacing={12}>
          {isLoading ? <LoadingFill /> : this.renderListChannel()}
        </Grid>
      </Container>
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
