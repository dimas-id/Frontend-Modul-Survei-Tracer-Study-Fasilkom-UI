import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import EmailTemplateForm from "../../components/stables/EmailTemplateForm";
import EmailTemplateVariableMenu from "../../components/stables/EmailTemplateVariableMenu";
import heliosV1 from "../../modules/api/helios/v1";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";
import { humanizeError } from "../../libs/response";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mr64,
    ...Guidelines.layouts.ml64
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    title: "",
    body: "",
    description: "",
    subject: "",
    errorMessage: null
  };

  handleVariable(variable) {
    this.setState(prevState => ({
      body: prevState.body + " " + variable + " "
    }));
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody({ target }) {
    this.setState({
      body: target.value
    });
  }

  handleSubject({ target }) {
    this.setState({
      subject: target.value
    });
  }

  handleDescription({ target }) {
    this.setState({
      description: target.value
    });
  }
  
  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  handleSubmit() {
    this.setErrorMessage("");

    heliosV1.email
      .createEmailTemplate(
        this.state.title,
        this.state.body,
        this.state.description,
        this.state.subject
      )
      .then(this.handleOpenSuccessMsg)
      .catch(err => {
        const fields = [
          'title',
          'body',
          'description',
          'subject'
        ];

        const humanizedErr = humanizeError(err.response.data, fields);

        this.setErrorMessage(`Judul: ${humanizedErr.title}, Subjek: ${humanizedErr.subject}, Deskripsi: ${humanizedErr.description}, Isi: ${humanizedErr.body}`);
        console.log(this.state.errorMessage)

        this.setState({ openErrorMsg: true })
        
        return err;
      });
  }

  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };


  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { classes } = this.props;
    const { title, body, description, subject } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Buat Templat Email" />
        <NavbarBack />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              <EmailTemplateForm
                title={title}
                body={body}
                subject={subject}
                description={description}
                onChangeTitle={this.handleTitle.bind(this)}
                onChangeBody={this.handleBody.bind(this)}
                onChangeSubject={this.handleSubject.bind(this)}
                onChangeDescription={this.handleDescription.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <EmailTemplateVariableMenu
                onPick={this.handleVariable.bind(this)}
              />
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccessMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccessMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSuccessMsg}
            variant="success"
            message={`Templat Email berhasil disimpan`}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openErrorMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={this.state.errorMessage}
          />
        </Snackbar>
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
