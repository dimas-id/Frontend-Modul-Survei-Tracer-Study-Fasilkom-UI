import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import {Guidelines} from "../../styles";
import ChantForm from "../../components/stables/ChantForm"
import Particle from "../../components/Particle";

import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";

import { makePathVariableUri } from "../../libs/navigation";
import { humanizeError } from "../../libs/response";

import { layouts } from "../../styles/guidelines";

import paths from "../paths";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    ...layouts.pt16,
    ...layouts.pb16,
    ...layouts.mt64,
    ...layouts.ml16,
    ...layouts.mr16,
    ...layouts.mb64,
    width: "90vw",
    ...layouts.borderBox
  },
  container:{
    ...layouts.flexMiddle
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
});

class Screen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      parentChant: null
    }
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody( target ) {
    this.setState({
      body: target
    });
  }

  componentDidMount(){
    if(Boolean(this.props.location.state)){
      this.setState({ parentChant: this.props.location.state.parentId})
    }
  }
  handleSubmit() {
    heliosV1.channel
      .postChant(
        this.props.user.id,
        this.props.match.params.channelId,
        this.state.parentChant,
        this.state.title,
        this.state.body
      )
      .then(({ data }) => {
        window.notifySnackbar(
          `Chant '${data.title}' berhasil dibuat`,
          { variant: "success" }
        );
        if(this.state.parentChant){
          this.props.history.push(
            makePathVariableUri(paths.CHANNEL_CHANT_DETAIL, {
              channelId: data.channel,
              chantId: this.state.parentChant
            })
          );
        }
        else{
          this.props.history.push(
            makePathVariableUri(paths.CHANNEL_CHANT, {
              channelId: data.channel
            })
          );
        }
      })
      .catch(({ response }) => {
        if(response) {
          const err = humanizeError(response.data);
          if (err.body) {
            window.notifySnackbar("Field 'Deskripsi' tidak boleh kosong", {
                  variant: "error"
                });
          }
          else{
            window.notifySnackbar("Sepertinya terjadi kesalahan", {
              variant: "error"
            });
          }
        }
      });
  }

  
  render() {
    const { classes } = this.props;
    const { title } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} />
        <Particle name="cloud1" right={0} bottom="15%" />
        <Container className={classes.container}>
          <Paper className={classes.root} elevation={4}>
            <Typography className={classes.title} variant="h5" component="h3">
              Membuat Chant
            </Typography>
            <ChantForm 
            title={title}
            onChantTitle={this.handleTitle.bind(this)}
            onChangeBody={this.handleBody.bind(this)}
            onSubmit={this.handleSubmit.bind(this)}
            />
          </Paper>
        </Container>
        </React.Fragment>
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
