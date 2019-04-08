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
import Warning from "@material-ui/icons/Warning";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { Guidelines } from "../../../styles";
import { makePathVariableUri } from "../../../libs/navigation";
import { getDateFormatted } from "../../../libs/datetime";
import paths from "../../../pages/paths";

import { authorize } from "../../../components/hocs/auth";
import { LoadingFill } from "../../../components/Loading";

import { getUser } from "../../../modules/session/selectors";
import atlasV1 from "../../../modules/api/atlas/v1";
import heliosV1 from "../../../modules/api/helios/v1";

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
  },
  warningIcon: {
    color: "#F1A153"
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogContent: {
    color: "#F1A153",
    textAlign: "center"
  },
  dialogActions: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.marginAuto,
    ...Guidelines.layouts.mb8,
    justifiyContent: "space-between",
  }
});

class Screen extends React.Component {
  state = {
    isLoading: true,
    userDetail: null,
    openDialog: false,
    checked: false,
    numberLikes: 0
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

    this.setState({
      checked: this.props.hasLiked,
      numberLikes: this.props.numberLikes
    })

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleUpdate = () => {
    this.props.history.push(makePathVariableUri(paths.CHANNEL_CHANT_UPDATE, {
      channelId: this.props.channel,
      chantId: this.props.id
    }))
  };

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

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

  handleLike = () => {
    heliosV1.channel
      .likeChant(
        this.props.id
      ).then(
        this.setState({checked: true, numberLikes: (this.state.numberLikes+1)})
      )
  }

  handleUnlike = () => {
    heliosV1.channel
      .unlikeChant(
        this.props.id
      ).then(
        this.setState({checked:false, numberLikes: (this.state.numberLikes-1)})
      )
  }

  renderCardHeader() {
    const { classes, deleted } = this.props;
    const { anchorEl } = this.state;

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
          <div>
          <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={(this.props.user.id === this.props.author) ? this.handleClick : null}>
            <MoreVertIcon />
          </IconButton>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          >
          <MenuItem onClick={this.handleUpdate}>Mengubah Chant</MenuItem>
          <MenuItem onClick={this.handleClickOpenDialog}>Menghapus Chant</MenuItem>
          </Menu>
          <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}><Warning className={classes.warningIcon}/></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={classes.dialogContent}>
            Apakah kamu yakin akan menghapus Chant ini?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={this.handleCloseDialog} style={{backgroundColor: "white", color:"black"}} variant="contained" color="primary">
              Tidak
            </Button>
            <Button onClick={() => this.props.onDelete(this.props.id)} style={{backgroundColor: "#F1A153", color:"white"}} variant="contained" autoFocus>
              Iya, saya yakin
            </Button>
          </DialogActions>
        </Dialog>
          </div>
        }
        title={name}
        subheader={getDateFormatted(this.props.dateCreated, "DD MMMM YYYY")}
      />
    );
  }

  render() {
    const { classes, margin, overflow, max, deleted } = this.props;
    const { isLoading } = this.state;
    
    var Converter = require('react-showdown').Converter;
var converter = new Converter();
 
var markdown = this.props.body
var reactElement = converter.convert(markdown);


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
                  {reactElement}
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
                      checked={this.state.checked}
                    />
                  }
                  onChange={this.state.checked ? this.handleUnlike : this.handleLike}
                  label={this.state.numberLikes}
                />
                <IconButton aria-label="Share" onClick={this.handleReply}>
                  <CommentIcon />
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
  const mapStateToProps = state => ({
    user: getUser(state)
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
