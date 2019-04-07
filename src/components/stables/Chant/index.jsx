import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { Guidelines } from "../../../styles";
import { makePathVariableUri } from "../../../libs/navigation";
import { getDateFormatted } from "../../../libs/datetime";
import paths from "../../../pages/paths";

import { withAuth } from "../../../components/hocs/auth";
import { LoadingFill } from "../../../components/Loading";

import atlasV1 from "../../../modules/api/atlas/v1";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pb24,
    width: "48vw"
  },
  chantWrapper: {
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
    isLoading: true,
    userDetail: null
  };

  componentDidMount() {
    if (!this.props.deleted) {
      atlasV1.session
        .getUserById(this.props.author)
        .then(result => {
          this.setState({ userDetail: result.data });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleReply = () => {
    this.props.history.push(
      makePathVariableUri(paths.CHANNEL_CHANT_CREATE, {
        channelId: this.props.channel
      }),
      {
        parentId: this.props.id
      }
    );
  };

  renderCardHeader() {
    const { classes, deleted } = this.props;

    if (deleted) {
      return null;
    }

    const { name } = this.state.userDetail;
    const { profilePicUrl } = this.state.userDetail.profile;
    return (
      <CardHeader
        avatar={
          <Avatar alt={name} src={profilePicUrl} className={classes.avatar} />
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={getDateFormatted(this.props.dateCreated, "DD MMMM YYYY")}
      />
    );
  }

  render() {
    const { classes, margin, overflow, max, deleted } = this.props;
    const { isLoading } = this.state;

    return (
      <Card className={classes.card} style={{ marginLeft: margin + "px" }}>
        {deleted ? null : isLoading ? <LoadingFill /> : this.renderCardHeader()}
        {deleted ? (
          "Chant telah dihapus"
        ) : (
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {this.props.title}
              </Typography>
              <div
                className={classes.chantWrapper}
                style={{ overflow: overflow, maxHeight: max, maxLine: max }}
              >
                <Typography variant="body2" gutterBottom>
                  {this.props.body}
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Link
                to={makePathVariableUri(paths.CHANNEL_CHANT_DETAIL, {
                  channelId: this.props.channel,
                  chantId: this.props.id
                })}
              >
                Lihat Detail...{" "}
              </Link>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value="checkedH"
                    />
                  }
                  label={this.props.numberLikes}
                />
                <IconButton aria-label="Share" onClick={this.handleReply}>
                  <CommentIcon  />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "10px" }}
                    gutterBottom
                  >
                    {this.props.numberChildrens}
                  </Typography>
                </IconButton>
              </div>
            </CardActions>
          </React.Fragment>
        )}
      </Card>
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
