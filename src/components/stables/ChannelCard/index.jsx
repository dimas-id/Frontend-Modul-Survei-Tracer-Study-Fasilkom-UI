import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { layouts } from "../../../styles/guidelines";

import heliosV1 from "../../../modules/api/helios/v1";

import { withAuth } from "../../../components/hocs/auth";

const styles = theme => ({
  media: {
    height: 140,
    ...layouts.w100
  },
  card: {
    ...layouts.pr4,
    ...layouts.pl4,
    ...layouts.pt4,
    ...layouts.pb4,
    ...layouts.ml8,
    ...layouts.flexDirCol,
    alignItems: "center",
    ...layouts.mb8,
    ...layouts.borderBox
  },
  textChannel: {
    ...layouts.w100
  }
});

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.hasSubscribed,
      hover: false
    };
  }

  handleSubscribe = () => {
    heliosV1.channel.subscribeChannel(this.props.id).then(
      this.setState({
        subscribed: true,
        hover: false
      })
    );
  };

  handleUnsubscribe = () => {
    heliosV1.channel.unsubscribeChannel(this.props.id).then(
      this.setState({
        subscribed: false
      })
    );
  };

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.coverImgUrl}
          title={this.props.title}
        />
        <CardContent>
          <Typography
            className={classes.textChannel}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {this.props.title}
          </Typography>
          <Typography className={classes.textChannel} component="p">
            {this.props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{
              backgroundColor: this.state.subscribed
                ? this.state.hover
                  ? "#ff4935"
                  : "#00C7E5"
                : "#FFFFFF",
              border: this.state.subscribed ? "" : "1px solid black"
            }}
            onClick={
              this.state.subscribed
                ? this.handleUnsubscribe
                : this.handleSubscribe
            }
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
          >
            {this.state.subscribed
              ? this.state.hover
                ? "Batalkan Langganan"
                : "Sudah Berlangganan"
              : "Berlangganan"}
          </Button>
        </CardActions>
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
