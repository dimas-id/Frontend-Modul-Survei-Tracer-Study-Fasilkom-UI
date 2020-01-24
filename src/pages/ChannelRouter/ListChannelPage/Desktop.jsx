import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Guidelines } from "../../../styles";

import heliosV1 from "../../../modules/api/helios/v1";
import { authorize, ROLES } from "../../../components/hocs/auth";
import { LoadingFill } from "../../../components/Loading";
import EmptyState from "../../../components/EmptyState";
import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";

import EmptyChannelImg from "../../../assets/states/EmptyChannel.svg";
import ChannelCard from "./ChannelCard";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.mb8,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pb24,
    ...Guidelines.layouts.borderBox,
  },
  paper: {
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24,
  },
  title: {
    ...Guidelines.fonts.medium,
    ...Guidelines.layouts.mb32,
    fontSize: 24,
  },
  chantWrapper: {
    maxHeight: 64,
    lineHeight: 64,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  actions: {
    display: "flex",
    ...Guidelines.layouts.flexDirCol,
    alignItems: "flex-start",
  },
});

class Screen extends React.Component {
  state = {
    listChannel: null,
    isLoading: true,
  };

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

  renderListChannel() {
    const { listChannel } = this.state;

    return (
      <React.Fragment>
        {listChannel &&
          listChannel.map(channel => (
            <Grid item xs={4}>
              <Link
                to={makePathVariableUri(paths.CHANNEL_CHANT, {
                  channelId: channel.id,
                })}
              >
                <ChannelCard
                  key={channel.id}
                  title={channel.title}
                  coverImgUrl={channel.coverImgUrl}
                />
              </Link>
            </Grid>
          ))}
        {(!listChannel || listChannel.length < 1) && (
          <EmptyState
            imgSrc={EmptyChannelImg}
            description="Belum ada channel yang tersedia. Silahkan ajukan pembuatan channel baru"
            ButtonProps={{ href: paths.CHANNEL_REQUEST }}
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h5" component="h3">
          Daftar Channel
        </Typography>
        {isLoading ? <LoadingFill /> : this.renderListChannel()}
      </Paper>
    );
  }
}

function createContainer() {
  return authorize({ mustVerified: true, roles: [ROLES.PUBLIC] })(
    withRouter(withStyles(styles)(Screen))
  );
}

export default createContainer();
