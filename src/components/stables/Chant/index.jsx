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
import ShareIcon from "@material-ui/icons/Share";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

import { Guidelines } from "../../../styles";
import { makePathVariableUri } from "../../../libs/navigation";
import { getDateFormatted } from "../../../libs/datetime";

import paths from "../../../pages/paths";
import { ROOT_URL } from "../../../config";

import { authorize } from "../../../components/hocs/auth";

import { getUser } from "../../../modules/session/selectors";
import heliosV1 from "../../../modules/api/helios/v1";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.pr16,
    ...Guidelines.layouts.pl16,
    ...Guidelines.layouts.pt4,
    ...Guidelines.layouts.pb4,
    flexGrow: 1,
  },
  chantWrapper: {
    textOverflow: "ellipsis"
  },
  actions: {
    display: "flex",
    ...Guidelines.layouts.flexDirCol,
    alignItems: "flex-start",
    ...Guidelines.layouts.pt4,
  },
  warningIcon: {
    color: "#F1A153",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    color: "#F1A153",
    textAlign: "center",
  },
  dialogActions: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.marginAuto,
    ...Guidelines.layouts.mb8,
    justifiyContent: "space-between",
  },
  cardHeader: {
    ...Guidelines.layouts.pt4,
    ...Guidelines.layouts.pb4,
  },
  cardContent: {
    ...Guidelines.layouts.pt4,
    ...Guidelines.layouts.pb4,
  },
  button: {
    ...Guidelines.layouts.mr8,
  }
});

class Screen extends React.Component {
  constructor(props){
    super(props);
    this.bodyText = React.createRef();
  }
  state = {
    userDetail: null,
    openDialog: false,
    checked: false,
    numberLikes: 0,
    overflow: "hidden",
    max: "64px",
    showDetail: false
  };

  componentDidMount() {
    let showDetail = false
    if(this.bodyText.current) {
      if(this.bodyText.current.offsetHeight > 63){
        showDetail = true
      }
    }
    this.setState({
      checked: this.props.hasLiked,
      numberLikes: this.props.numberLikes,
      overflow: this.props.overflow,
      max: this.props.max,
      showDetail,
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickShare = event => {
    this.setState({ anchorElShare: event.currentTarget });
  };

  handleCloseShare = () => {
    this.setState({ anchorElShare: null });
  };

  handleUpdate = () => {
    this.props.history.push(
      makePathVariableUri(paths.CHANNEL_CHANT_UPDATE, {
        channelId: this.props.channel,
        chantId: this.props.id,
      })
    );
  };

  handleReply = () => {
    this.props.history.push(
      makePathVariableUri(paths.CHANNEL_CHANT_DETAIL, {
        channelId: this.props.channel,
        chantId: this.props.id,
      })
    );
  };

  handleLike = () => {
    heliosV1.channel.likeChant(this.props.id).then(
      this.setState({
        checked: true,
        numberLikes: this.state.numberLikes + 1,
      })
    );
  };

  handleUnlike = () => {
    heliosV1.channel.unlikeChant(this.props.id).then(
      this.setState({
        checked: false,
        numberLikes: this.state.numberLikes - 1,
      })
    );
  };

  renderCardHeader() {
    const { classes, deleted } = this.props;
    const { anchorEl } = this.state;

    if (deleted) {
      return null;
    }

    return (
      <CardHeader
        className={classes.cardHeader}
        action={
          <div>
            <IconButton
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={
                this.props.user.id === this.props.author.id
                  ? this.handleClick
                  : null
              }
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleUpdate}>Mengubah Chant</MenuItem>
              <MenuItem
                onClick={() =>
                  this.props.onDelete(
                    this.props.author.id,
                    this.props.id,
                    this.props.channel
                  )
                }
              >
                Menghapus Chant
              </MenuItem>
            </Menu>
          </div>
        }
        title={this.props.author.firstName + " " + this.props.author.lastName}
        titleTypographyProps={{ variant: "body2" }}
        subheader={getDateFormatted(this.props.dateCreated, "DD MMMM YYYY")}
        subheaderTypographyProps={{ variant: "body2" }}
      />
    );
  }

  render() {
    const { classes, margin, deleted, body } = this.props;
    const { overflow, max, anchorElShare, showDetail } = this.state;
    const shareUrl =
      ROOT_URL +
      makePathVariableUri(paths.CHANNEL_CHANT_DETAIL, {
        channelId: this.props.channel,
        chantId: this.props.id,
      });

    return (
      
      <Card className={classes.card} style={{ marginLeft: margin + "px" }}>
        {deleted ? null : this.renderCardHeader()}
        {deleted ? (
          "Chant telah dihapus"
        ) : (
          <React.Fragment>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">{this.props.title}</Typography>
              <div
                ref={this.bodyText}
                className={classes.chantWrapper}
                style={{ overflow: overflow, maxHeight: max, maxLine: max }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  gutterBottom
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              {showDetail && <Link
                onClick={() => this.setState({ overflow: "visible", max: "" })}
              >
                <Typography variant="body2">Lihat Detail... </Typography>
              </Link>}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={this.state.checked}
                    />
                  }
                  onChange={
                    this.state.checked ? this.handleUnlike : this.handleLike
                  }
                  label={this.state.numberLikes}
                />
                <IconButton aria-label="Share" onClick={this.handleReply}>
                  <CommentIcon />
                  <Typography variant="body2" style={{ marginLeft: "10px" }}>
                    {this.props.numberChildrens}
                  </Typography>
                </IconButton>

                <IconButton
                  aria-owns={anchorElShare ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClickShare}
                >
                  <ShareIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElShare}
                  open={Boolean(anchorElShare)}
                  onClose={this.handleCloseShare}
                >
                  <MenuItem>
                    <FacebookShareButton
                      url={shareUrl}
                      quote={"Lihat Chant '" + this.props.title + "' ini di ILUNI12Channel!! "}
                      hashtag={"#ILUNI12Channel"}
                      className={classes.button}
                    >
                      <FacebookIcon size={32} round={false} />
                    </FacebookShareButton>
                    Facebook
                  </MenuItem>
                  <MenuItem>
                    <EmailShareButton
                      url={shareUrl}
                      subject={
                        "[ILUNI12Channel] " + this.props.title 
                      }
                      body={
                        "Lihat Chant '" + this.props.title + "' ini di ILUNI12Channel!! " + shareUrl
                      }
                      className={classes.button}
                    >
                      <EmailIcon size={32} round={false} />
                    </EmailShareButton>
                    Email
                  </MenuItem>
                  <MenuItem>
                  <WhatsappShareButton
                      url={shareUrl}
                      title={
                        "Lihat Chant '" + this.props.title + "' ini di ILUNI12Channel!! "
                      }
                      className={classes.button}
                    >
                      <WhatsappIcon size={32} round={false} />
                    </WhatsappShareButton>
                    WhatsApp
                  </MenuItem>
                  <MenuItem>
                  <TelegramShareButton
                      url={shareUrl}
                      title={
                        "Lihat Chant '" + this.props.title + "' ini di ILUNI12Channel!! "
                      }
                      className={classes.button}
                    >
                      <TelegramIcon size={32} round={false} />
                    </TelegramShareButton>
                    Telegram
                  </MenuItem>
                </Menu>
              </div>
            </CardActions>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
  });

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
