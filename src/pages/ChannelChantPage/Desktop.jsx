import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantCard from "../../components/stables/Chant";
import ChannelCard from "../../components/stables/ChannelCard";
import EndCard from "../../components/stables/EndCard";

import fixture from "./fixture.json";
import channelDetail from "./channel-detail.json";

import { layouts } from "../../styles/guidelines";

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...layouts.mt32,
  },
  wrapDescription: {
    maxHeight: 64,
    overflow: "hidden",
    ...layouts.w100
  },
  grid: {
    ...layouts.borderBox
  },
  card : {
    ...layouts.ml64,
    ...layouts.mb8,
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
        <NavbarAuth  />
        <NavbarBack />
        <Container className={classes.root}>
          <Grid className={classes.grid} container spacing={24}>
            <Grid item xs={3}>
              <ChannelCard title={channelDetail.title} description={channelDetail.description} coverImgUrl={channelDetail.coverImgUrl} />
            </Grid>
            <Grid item xs={9}>
              {fixture.map(chant => (
                <div className = {classes.card}>
                  <ChantCard key={chant.id} dateCreated={chant.dateCreated} 
                  numberLikes={chant.numberLikes} title={chant.title} body={chant.body}
                  channel={chant.channel} id={chant.id}/>
                </div>  
              ))}
              <EndCard marginLeft="64"/>
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
