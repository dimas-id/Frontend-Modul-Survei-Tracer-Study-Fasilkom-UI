import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../../components/hocs/auth";
import { Container } from "../../../components/Container";
import ChantCard from "../../../components/stables/Chant";
import EndCard from "../../../components/stables/EndCard";
import { LoadingFill } from "../../../components/Loading";

import { Guidelines } from "../../../styles";

import { getUser } from "../../../modules/session/selectors";
import heliosV1 from "../../../modules/api/helios/v1";


const styles = theme => ({
  card: {
    ...Guidelines.layouts.ml64,
    ...Guidelines.layouts.mb8
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
    listChant: null,
    isLoading: true
  }

  componentDidMount() {
    heliosV1.channel
      .getTimeline()
      .then(result => {
        this.setState({ listChant: result.data.results })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      }
    )
  }
  
  renderChantTimeline() {
    const { listChant } = this.state;
    const { classes } = this.props;

    return(
      <React.Fragment>
        {listChant.map(chant => (
        <div className={classes.card}>
          <ChantCard
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
            deleted={Boolean(chant.dateDeleted)}
            numberChildrens={chant.numberChildrens}
          />
        </div>
      ))}
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

  return (
    <Container className={classes.root}>
      {isLoading ? <LoadingFill /> : this.renderChantTimeline()}
      <EndCard marginLeft="64" />
    </Container>
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