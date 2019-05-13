import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

import { authorize } from "../../components/hocs/auth";
import { Form, getFieldProps } from "../../components/hocs/form";
import MailBatchForm from "../../components/stables/Mailer/MailBatchForm";
import { NavbarAuth } from "../../components/stables/Navbar";
import NavbarEmailBatch from "../../components/stables/Navbar/NavbarEmailBatch";
import { Container } from "../../components/Container";
import SelectContact from "./SelectContact";

import { humanizeError } from "../../libs/response";
import { createBatch, createJobs } from "../../modules/crm/mailer/thunks";
import { Guidelines } from "../../styles";
import paths from "../paths";

const styles = theme => ({
  form: {
    boxSizing: "border-box",
    [theme.breakpoints.up("sm")]: {
      ...Guidelines.layouts.pt48,
      ...Guidelines.layouts.pb48,
      ...Guidelines.layouts.pr48,
      ...Guidelines.layouts.pl48,
    },
  },
  paper: {
    ...Guidelines.layouts.mt32,
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
    },
  },
  wrapperSearchContact: {
    marginTop: 12,
  },
});

class EmailBatchCreatePage extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    selectedContact: [],
    batchSuccessId: -1,
  };

  handleSelectContact = selectedContact => {
    this.setState({ selectedContact });
  };

  runSubmitJobs = () => {
    const { history } = this.props;
    const { batchSuccessId, selectedContact } = this.state;
    const jobs = selectedContact.map(item => ({ recipient: item.id }));

    return this.props
      .createJobs(batchSuccessId, jobs)
      .then(() => {
        history.push(paths.CRM);
      })
      .catch(e => {

        if(this.setLoading) {
          this.setLoading(false);
        }

        let title = "";
        if (e.response) {
          const numUnknownContacts = e.response.data.filter(item =>
            Boolean(item.recipient)
          ).length;
          title = `${numUnknownContacts} kontak tidak ditemukan`;
        } else {
          title = "Gagal menambahkan kontak";
        }

        window.alertDialog(
          title,
          "Batch berhasil terbuat, namun gagal menambahkan kontak. Simpan ulang?",
          this.runSubmitJobs,
          () => {}
        );
      });
  };

  handleSubmit = (values, actions) => {
    const { selectedContact, batchSuccessId } = this.state;

    this.setLoading = actions.setSubmitting;
    // set false, runSubmit then set true
    actions.setSubmitting(false);

    const runSubmit = () => {
      const { create } = this.props;
      const { fields } = MailBatchForm;
      const template = values[fields.template].id;

      actions.setSubmitting(true);
      create([
        values[fields.title],
        values[fields.subject],
        template,
        values[fields.senderAddress],
      ])
        .then(({ data }) => {
          this.setState({ batchSuccessId: data.id }, this.runSubmitJobs);
        })
        .catch(e => {
          if (e.response) {
            const errMessages = humanizeError(e.response.data, fields);
            errMessages && actions.setErrors(errMessages);
          }
          actions.setSubmitting(false);
        });
    };

    const numContact = selectedContact.length;
    const dialogParams = [];
    if (numContact <= 0) {
      dialogParams.push(
        "Kontak diperlukan",
        "Anda tidak dapat menambahkan kontak setelah membuat.",
        () => null
      );
    } else {
      dialogParams.push(
        `${numContact} kontak`,
        "Setelah batch terbuat, Anda tidak dapat menambahkan kontak lagi. Lanjutkan?",
        batchSuccessId < 0 ? runSubmit : this.runSubmitJobs,
        () => null
      );
    }
    window.alertDialog(...dialogParams);
  };

  render() {
    const { classes } = this.props;
    const { fields } = MailBatchForm;
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
              {({ handleSubmit, isSubmitting, ...otherFormProps }) => (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <NavbarEmailBatch
                    title="Membuat Batch"
                    ButtonSubmitProps={{
                      type: "submit",
                      disabled: isSubmitting,
                    }}
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
                    >
                      <div className={classes.wrapperSearchContact}>
                        <SelectContact
                          selected={this.state.selectedContact}
                          onSelect={this.handleSelectContact}
                        />
                      </div>
                    </MailBatchForm>
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
    createJobs: (batchId, jobs) => dispatch(createJobs(batchId, jobs)),
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
