import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../components/hocs/auth";
import { NavbarBack, NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantCard from "../../components/stables/Chant";
import { LoadingFill } from "../../components/Loading";

import { layouts } from "../../styles/guidelines";

import heliosV1 from "../../modules/api/helios/v1";

const styles = theme => ({
  card: {
    ...layouts.ml64,
    ...layouts.mt64,
    ...layouts.mb8
  },
  endCard: {
    ...layouts.pt16,
    ...layouts.pb16,
    height: "60px",
    backgroundColor: "#9f9fa0"
  }
});

class Screen extends React.Component {
  state = {
    listChant: null,
    isLoading: true
  };

  componentDidMount() {
    heliosV1.channel
      .getListChantReply(
        this.props.match.params.channelId,
        this.props.match.params.chantId
      )
      .then(result => {
        this.setState({ listChant: result.data.results })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      }
    )
  }

  renderChantCard() {
    const { listChant } = this.state;
    const { classes } = this.props;
    const distanceToParent = listChant[0].level;

    return (
      <React.Fragment>
        {listChant.map(chant => (
          <div className={classes.card}>
            <ChantCard
              overflow={
                chant.level - distanceToParent === 0 ? "visible" : "hidden"
              }
              max={chant.level - distanceToParent === 0 ? "" : "64px"}
              margin={(chant.level - distanceToParent) * 80}
              id={chant.id}
              key={chant.id}
              dateCreated={chant.dateCreated}
              numberLikes={chant.numberLikes}
              title={chant.title}
              body={chant.body}
              channel={chant.channel}
              author={chant.author}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
  render() {
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Container>
          {isLoading ? <LoadingFill /> : this.renderChantCard()}
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
