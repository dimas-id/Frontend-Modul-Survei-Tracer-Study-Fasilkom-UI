import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import EmailTemplateForm from "../../components/stables/EmailTemplateForm";
import EmailTemplateVariableMenu from "../../components/stables/EmailTemplateTagsMenu";
import heliosV1 from "../../modules/api/helios/v1";

import { humanizeError } from "../../libs/response";
import paths from "../paths";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      description: "",
      subject: "",
      errorMessage: ["", "", "", ""],
    };

    this.bodyInputRef = React.createRef();
  }

  handleVariable(variable) {
    const { current } = this.bodyInputRef;
    const endPos = current.selectionEnd;

    const currentBody = this.state.body;

    const startPos =
      current.selectionStart === endPos ? 0 : current.selectionStart;

    const leftBody = currentBody.substring(startPos, endPos);
    const rightBody = currentBody.substring(endPos, currentBody.length);

    this.setState({ body: `${leftBody} ${variable} ${rightBody}` });
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value,
    });
  }

  handleBody({ target }) {
    this.setState({
      body: target.value,
    });
  }

  handleSubject({ target }) {
    this.setState({
      subject: target.value,
    });
  }

  handleDescription({ target }) {
    this.setState({
      description: target.value,
    });
  }

  handleSubmit() {
    heliosV1.email
      .createEmailTemplate(
        this.state.title,
        this.state.body,
        this.state.description,
        this.state.subject
      )
      .then(() => {
        const { history } = this.props;
        window.notifySnackbar("Templat Email berhasil disimpan", {
          variant: "success",
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
        <NavbarAuth title="Buat Templat Email" />
        <NavbarBack />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper elevation={1} className={classes.showTemplateResult}>
                <h4 style={{ marginTop: 0 }}>Tinjau Templat</h4>
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
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
                setBodyRef={this.bodyInputRef}
              />
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
  const mapStateToProps = null;

  const mapDispatchToProps = dispatch => ({});

  return authorize({
    mustVerified: false,
    roles: [authorize.STAFF, authorize.SUPERUSER],
  })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
