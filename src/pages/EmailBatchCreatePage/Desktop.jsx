import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {withStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import {authorize} from "../../components/hocs/auth";
import {Form, getFieldProps} from "../../components/hocs/form";
import MailBatchForm from "../../components/stables/Mailer/MailBatchForm";
import {NavbarAuth} from "../../components/stables/Navbar";
import NavbarEmailBatch from "../../components/stables/Navbar/NavbarEmailBatch";
import {Container} from "../../components/Container";

import {humanizeError} from "../../libs/response";
import {createBatch} from "../../modules/mailer/thunks";
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
});

class EmailBatchCreatePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  handleSubmit = (values, actions) => {
    const {create, history} = this.props;
    const {fields} = MailBatchForm;

    actions.setSubmitting(true);

    const template = values[fields.template].id;
    create([
      values[fields.title],
      values[fields.subject],
      template,
      values[fields.senderAddress],
    ])
      .then(() => {
        history.push(paths.CRM_CONTACT);
      })
      .catch((e) => {
        if (e.response) {
          const errMessages = humanizeError(e.response.data, fields);
          errMessages && actions.setErrors(errMessages);
        }
        actions.setSubmitting(false);
      });
  };

  render() {
    const {classes} = this.props;
    const {fields} = MailBatchForm;
    return (
      <React.Fragment>
        <NavbarAuth />
        <Container>
          <Paper elevation={1} className={classes.paper}>
            <Form
              validationSchema={MailBatchForm.validator}
              initialValues={MailBatchForm.initializeValues({
                [fields.senderAddress]: "noreply",
              })}
              onSubmit={this.handleSubmit}
            >
              {({handleSubmit, isSubmitting, ...otherFormProps}) => (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <NavbarEmailBatch
                    title="Membuat Batch"
                    ButtonSubmitProps={{type: "submit", disabled: isSubmitting}}
                  />
                  <div className={classes.form}>
                    <MailBatchForm
                      titleField={{
                        ...getFieldProps(fields.title, otherFormProps),
                      }}
                      subjectField={{
                        ...getFieldProps(fields.subject, otherFormProps),
                      }}
                      templateField={{
                        ...getFieldProps(fields.template, otherFormProps),
                      }}
                      senderAddressField={{
                        ...getFieldProps(fields.senderAddress, otherFormProps),
                      }}
                    />
                  </div>
                </form>
              )}
            </Form>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = null;

  const mapDispatchToProps = dispatch => ({
    create: params => dispatch(createBatch(...params)),
  });

  return authorize({
    mustVerified: false,
    roles: [authorize.roles.STAFF, authorize.roles.SUPERUSER],
  })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(EmailBatchCreatePage))
    )
  );
}

export default createContainer();
