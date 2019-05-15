import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
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
  }
});

class Screen extends React.PureComponent {
  state = {
    title: "",
    body: "",
    loading: true,
    defaultValue: ""
  }

  componentDidMount() {
    heliosV1.channel
    .getChantDetail(this.props.user.id, this.props.match.params.chantId)
      .then(result => {
        this.setState({
          title: result.data.title,
          body: result.data.body,
          defaultValue: result.data.body
        })
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody( target ) {
    this.setState({
      body: target
    })
  }

  handleSubmit() {
    heliosV1.channel
      .updateChant(
        this.props.user.id,
        this.props.match.params.chantId,
        this.state.title,
        this.state.body
      )
      .then(({ data }) => {
        window.notifySnackbar(
          `Chant '${data.title}' berhasil diubah`,
          { variant: "success" }
        );
          this.props.history.push(
            makePathVariableUri(paths.USER_CHANT, {
              username: data.author
            }),
            {
              userId: data.author
            }
          )
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
    const { title, defaultValue } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Container className={classes.container}>
        <Particle name="cloud2" left={0} />
        <Particle name="cloud1" right={0} bottom="15%" />
          <Paper className={classes.root} elevation={4}>
            <Typography variant="h5" component="h3">
              Mengubah Chant
            </Typography>
            <ChantForm
            title={title}
            body={defaultValue}
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
