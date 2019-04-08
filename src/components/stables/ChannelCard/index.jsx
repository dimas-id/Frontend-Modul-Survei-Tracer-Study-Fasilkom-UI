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

/**
 * @TODO SIMPLIFY THIS
 */
class Screen extends React.Component {
  state = {
    subscribed: false,
    variant: "outlined",
    label: "subscribe",
    backgroundColor: "#FFFFFF"
  };

  componentDidMount() {
    /**
     * @TODO bisa constructor langsung saja
     */
    this.setState({
      subscribed: this.props.hasSubscribed,
      variant: this.props.hasSubscribed ? "contained" : "outlined",
      label: this.props.hasSubscribed ? "Berlangganan" : "Langganan",
      backgroundColor: this.props.hasSubscribed ? "#00C7E5" : "#FFFFFF"
    });
  }

  handleSubscribe = () => {
    heliosV1.channel
      .subscribeChannel(this.props.id)
      .then(
        this.setState({
          subscribed: true,
          variant: "contained",
          label: "Berlangganan",
          backgroundColor: "#00C7E5"
        })
      );
  };

  handleUnsubscribe = () => {
    heliosV1.channel
      .unsubscribeChannel(this.props.id)
      .then(
        this.setState({
          subscribed: false,
          variant: "outlined",
          label: "Langganan",
          backgroundColor: "#FFFFFF"
        })
      );
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.coverImgUrl}
          title="Contemplative Reptile"
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
            variant={this.state.variant}
            className={classes.button}
            backgroundColor="{this.state.backgroundColor}"
            onClick={
              this.state.subscribed
                ? this.handleUnsubscribe
                : this.handleSubscribe
            }
          >
            {this.state.label}
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
