import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../../components/hocs/auth";
import ChantCard from "../../../components/stables/Chant";
import EndCard from "../../../components/stables/EndCard";
import { LoadingFill } from "../../../components/Loading";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { Guidelines } from "../../../styles";

import { getUser } from "../../../modules/session/selectors";
import heliosV1 from "../../../modules/api/helios/v1";
import EmptyState from "../../../components/EmptyState";
import paths from "../../../pages/paths";
import EmptyChannelImg from "../../../assets/states/EmptyChannel.svg";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.ml64,
    ...Guidelines.layouts.mb8,
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
    listChant: null,
    isLoading: true,
  };

  componentDidMount() {
    this.loadChant();
  }

  loadChant = () => {
    heliosV1.channel
      .getTimeline()
      .then(result => {
        this.setState({ listChant: result.data.results });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleDelete = (userId, chantId) => {
    window.alertDialog(
      "Konfirmasi Penghapusan", //title
      "Apakah anda yakin Chant ini?",
      () => {
        heliosV1.channel
          .deleteChant(userId, chantId)
          .then(() => {
            this.loadChant();
            window.notifySnackbar("Chant berhasil dihapus", {
              variant: "success",
            });
          })
          .catch(() =>
            window.notifySnackbar("Chant tidak dapat dihapus", {
              variant: "warning",
            })
          );
      },
      () => null
    );
  };

  renderChantTimeline() {
    const { listChant } = this.state;
    const { classes } = this.props;
    const isNotEmpty = listChant && listChant.length > 0;
    return (
      <React.Fragment>
        {isNotEmpty &&
          listChant.map(chant => (
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
                hasLiked={chant.hasLikedByCurrentUser}
                onDelete={this.handleDelete}
              />
            </div>
          ))}
        {isNotEmpty && <EndCard marginLeft="64" />}
        {!isNotEmpty && (
          <Card>
            <CardContent>
              <EmptyState
                imgSrc={EmptyChannelImg}
                description="Belum ditemukan chant dari channel yang telah di-subscribe. Buat chant baru?"
                ButtonProps={{ href: paths.CHANNEL_CHANT_CREATE }}
              />
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <LoadingFill /> : this.renderChantTimeline();
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
  });
  return withAuth(
    withRouter(connect(mapStateToProps)(withStyles(styles)(Screen)))
  );
}

export default createContainer();
