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
import EmailTemplateVariableMenu from "../../components/stables/EmailTemplateTagsMenu";
import heliosV1 from "../../modules/api/helios/v1";

import { humanizeError } from "../../libs/response";
import ErrorMessageBoundary from "../../components/ErrorMessageBoundary";
import paths from "../paths";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    emailTemplate: null,
    title: "",
    body: "",
    description: "",
    subject: "",
    loading: true,
    errorMessage: ["", "", "", ""],
  };

  componentDidMount() {
    heliosV1.email
      .getEmailTemplateById(this.props.match.params.idEmailTemplate)
      .then(result => {
        this.setState({
          emailTemplate: result.data,
          title: result.data.title,
          body: result.data.body,
          description: result.data.description,
          subject: result.data.subject
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

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

  handleSubmit() {
    heliosV1.email
      .updateEmailTemplate(
        this.props.match.params.idEmailTemplate,
        this.state.title,
        this.state.body,
        this.state.description,
        this.state.subject
      )
      .then(() => {
        const { history } = this.props;
        window.notifySnackbar("Templat Email berhasil disimpan", {
          variant: "success"
        });
        history.push(paths.CRM_EMAIL_TEMPLATE_LIST);
      })
      .catch(err => {
        const fields = ["title", "body", "description", "subject"];
        const humanizedErr = humanizeError(err.response.data, fields);
        this.setState({
          errorMessage: [
            humanizedErr.title,
            humanizedErr.subject,
            humanizedErr.description,
            humanizedErr.body,
          ],
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { title, body, description, subject, errorMessage } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Ubah Templat Email" />
        <NavbarBack />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              <ErrorMessageBoundary>
                <EmailTemplateForm
                  title={title}
                  body={body}
                  subject={subject}
                  description={description}
                  errorMessage={errorMessage}
                  onChangeTitle={this.handleTitle.bind(this)}
                  onChangeBody={this.handleBody.bind(this)}
                  onChangeSubject={this.handleSubject.bind(this)}
                  onChangeDescription={this.handleDescription.bind(this)}
                  onSubmit={this.handleSubmit.bind(this)}
                />
              </ErrorMessageBoundary>
            </Grid>
            <Grid item xs={12} sm={3}>
              <EmailTemplateVariableMenu
                onPick={this.handleVariable.bind(this)}
              />
            </Grid>
          </Grid>
        </Container>
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
