import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { authorize } from "../../components/hocs/auth";
import { NavbarBackChannel , NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import ChantCard from "../../components/stables/Chant";
import { LoadingFill } from "../../components/Loading";


import paths from "../../pages/paths";
import { makePathVariableUri } from "../../libs/navigation";
import { layouts } from "../../styles/guidelines";

import heliosV1 from "../../modules/api/helios/v1";

const styles = theme => ({
  card: {
    ...layouts.ml64,
    ...layouts.mt64
  }
});

class Screen extends React.Component {
  state = {
    listChant: null,
    isLoading: true,
  };

  componentDidMount() {
    heliosV1.channel
      .getListChantReply(
        this.props.match.params.channelId,
        this.props.match.params.chantId
      )
      .then(result => {
        this.setState({ listChant: result.data.results });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  handleDelete = (userId, chantId, channelId) => {
    window.alertDialog(
      "Konfirmasi Penghapusan", //title
      "Apakah anda yakin Chant ini?",
      () => {
        heliosV1.channel
      .deleteChant(userId, chantId)
      .then(() => {
        this.setState({ isLoading: true });
      })
      .then(() => {
        this.handleOpenSuccessMsg();
        this.props.history.push(
          makePathVariableUri(paths.CHANNEL_CHANT, {
            channelId: channelId
          })
        );
        this.handleOpenSuccessMsg();
      })
      .catch(this.handleOpenErrorMsg);
      },
      () => null
    );
    
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
              deleted={Boolean(chant.dateDeleted)}
              numberChildrens={chant.numberChildrens}
              hasLiked={chant.hasLikedByCurrentUser}
              onDelete={this.handleDelete}
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
        <NavbarBackChannel channelId={this.props.match.params.channelId} chantId={this.props.match.params.chantId}
         />
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
