import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import get from "lodash/get";
import pick from "lodash/pick";

import {withStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import {authorize} from "../../components/hocs/auth";
import {Form} from "../../components/hocs/form";
import {LoadingFill} from "../../components/Loading";
import MailBatchForm from "../../components/stables/Mailer/MailBatchForm";
import {NavbarAuth} from "../../components/stables/Navbar";
import NavbarEmailBatch from "../../components/stables/Navbar/NavbarEmailBatch";
import {Container} from "../../components/Container";

import {humanizeError} from "../../libs/response";
import {getBatchById, updateBatch} from "../../modules/mailer/thunks";
import {selectBatch, selectTemplateById} from "../../modules/mailer/selectors";
import {Guidelines} from "../../styles";
import paths from "../paths";

const styles = theme => ({
  form: {
    boxSizing: "border-box",
    ...Guidelines.layouts.pt48,
    ...Guidelines.layouts.pb48,
    ...Guidelines.layouts.pr48,
    ...Guidelines.layouts.pl48,
  },
  paper: {
    ...Guidelines.layouts.mt32,
  },
  loadingBg: {
    ...Guidelines.layouts.w100,
    minHeight: 320,
  },
});

class EmailBatchUpdatePage extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.get().finally(() => {
      this.setState({loading: false});
    });
  }

  getInitialValues() {
    const {fields} = MailBatchForm;
    const {batch, template} = this.props;
    const values = pick(batch, Object.keys(fields));
    return MailBatchForm.initializeValues({...values, template});
  }

  handleSubmit = (values, actions) => {
    const {update, history, batch} = this.props;
    const {fields} = MailBatchForm;

    actions.setSubmitting(true);

    const template = values[fields.template].id;
    update(batch.id, [
      values[fields.title],
      values[fields.subject],
      template,
      values[fields.senderAddress],
    ])
      .then(() => {
        history.push(paths.CRM_CONTACT);
      })
      .catch(e => {
        if (e.response) {
          const errMessages = humanizeError(e.response.data, fields);
          errMessages && actions.setErrors(errMessages);
        }
        actions.setSubmitting(false);
      });
  };

  renderForm = ({handleSubmit, isSubmitting}) => {
    const {classes, batch} = this.props;
    const {loading} = this.state;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <NavbarEmailBatch
          title="Mengubah Batch"
          ButtonSubmitProps={{
            type: "submit",
            disabled: isSubmitting || loading || batch.hasDispatched,
          }}
        />
        {loading && <LoadingFill className={classes.loadingBg} />}
        {!loading && (
          <div className={classes.form}>
            <MailBatchForm disabled={batch.hasDispatched} />
          </div>
        )}
      </form>
    );
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <NavbarAuth />
        <Container>
          <Paper elevation={1} className={classes.paper}>
            <Form
              isInitialValid
              enableReinitialize
              validationSchema={MailBatchForm.validator}
              initialValues={this.getInitialValues()}
              onSubmit={this.handleSubmit}
            >
              {this.renderForm}
            </Form>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => {
    const batch = selectBatch(state);
    return {
      batch,
      template: selectTemplateById(state, batch.template),
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (batchId, payload) => dispatch(updateBatch(batchId, payload)),
    get: () => dispatch(getBatchById(get(ownProps, "match.params.batchId"))),
  });

  return authorize({
    mustVerified: false,
    roles: [authorize.roles.STAFF, authorize.roles.SUPERUSER],
  })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(EmailBatchUpdatePage))
    )
  );
}

export default createContainer();
