import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBackChannel } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantCard from "../../components/stables/Chant";
import ChannelCard from "../../components/stables/ChannelCard";
import EndCard from "../../components/stables/EndCard";
import { LoadingFill } from "../../components/Loading";

import { layouts } from "../../styles/guidelines";

import heliosV1 from "../../modules/api/helios/v1";

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...layouts.mt32
  },
  grid: {
    ...layouts.borderBox
  },
  card: {
    ...layouts.ml64,
    ...layouts.mb8
  }
});

class Screen extends React.Component {
  state = {
    channelDetail: null,
    listChant: null,
    isLoadingChannel: true,
    isLoadingChant: true
  };

  componentDidMount() {
    heliosV1.channel
      .getChannelDetail(this.props.match.params.channelId)
      .then(result => {
        this.setState({ channelDetail: result.data });
      })
      .finally(() => {
        this.setState({ isLoadingChannel: false });
      });

    heliosV1.channel
      .getListChant(this.props.match.params.channelId)
      .then(result => {
        this.setState({ listChant: result.data.results });
      })
      .finally(() => {
        this.setState({ isLoadingChant: false });
      });
  }

  renderChannel() {
    const { channelDetail } = this.state;
    if (!channelDetail) {
      return null;
    }
    return (
      <ChannelCard
        title={channelDetail.title}
        description={channelDetail.description}
        coverImgUrl={channelDetail.coverImgUrl}
        id={channelDetail.id}
        hasSubscribed={channelDetail.hasSubscribedByCurrentUser}
      />
    );
  }

  renderChant() {
    const { listChant } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {listChant.map(chant => (
          <div className={classes.card}>
            <ChantCard
              deleted={Boolean(chant.dateDeleted)}
              key={chant.id}
              dateCreated={chant.dateCreated}
              numberLikes={chant.numberLikes}
              title={chant.title}
              body={chant.body}
              channel={chant.channel}
              id={chant.id}
              author={chant.author}
              overflow="hidden"
              max="64px"
              numberChildrens={chant.numberChildrens}
              hasLiked={chant.hasLikedByCurrentUser}
            />
          </div>
        ))}
        <EndCard marginLeft="64" />
      </React.Fragment>
    );
  }

  render() {
    const { isLoadingChannel } = this.state;
    const { isLoadingChant } = this.state;

    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackChannel channelId={this.props.match.params.channelId} chantId={null}/>

        <Container className={classes.root}>
          <Grid className={classes.grid} container spacing={24}>
            <Grid item xs={3}>
              {isLoadingChannel ? <LoadingFill /> : this.renderChannel()}
            </Grid>
            <Grid item xs={9}>
              {isLoadingChant ? <LoadingFill /> : this.renderChant()}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({});

  return authorize({ mustVerified: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
