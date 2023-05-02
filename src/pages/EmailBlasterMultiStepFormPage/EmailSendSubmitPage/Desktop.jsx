import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import emailBlasterAPI from "../../../modules/api/atlas/v3/email-blaster";
import { NavbarAuth, NavbarBack } from "../../../components/stables/Navbar";
import EmailSendPreview from "../../../components/stables/EmailSendPreview";
import { Container } from "../../../components/Container";
import { Guidelines } from "../../../styles";
import { authorize } from "../../../components/hocs/auth";
import { EMAIL_BLASTER_EMAIL_TEMPLATE } from "../../paths";
import Toast from "../../../components/Toast";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    maxHeight: "80vh",
  },
  buttonContainer: {
    textAlign: "right",
  },
  button: {
    marginLeft: "auto",
    fontSize: "larger",
  },
});

function Screen({ classes, templateId, surveiId, recipients }) {
  const history = useHistory();
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [recipientsState, setRecipients] = React.useState([]);

  useEffect(() => {
    if (templateId == null) {
      history.push(EMAIL_BLASTER_EMAIL_TEMPLATE);
      Toast("Pilih template terlebih dahulu!", "error");
      return;
    }
    // TODO: implement for surveiId and recipients
    // if (surveiId == null) {
    // }
    // if (recipients.length === 0) {
    // }

    emailBlasterAPI
      .getPreviewEmail(templateId, surveiId, recipients)
      .then(res => {
        setRecipients(res.data.recipients);
        setSubject(res.data.emailSubject);
        setBody(res.data.emailBody);
      })
      .catch(err => {
        Toast("Gagal membuat email!", "error");
      });
  }, [templateId, surveiId, recipients, history]);

  const onSubmit = () => {
    emailBlasterAPI.sendEmail(templateId, surveiId, recipients);
  };

  return (
    <React.Fragment>
      <NavbarAuth title="Kirim Email" />
      <NavbarBack />
      <Container className={classes.container}>
        <Grid container spacing={32} direction="row">
          <Grid item xs={12}>
            <EmailSendPreview
              recipients={recipientsState}
              subject={subject}
              body={body}
            />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSubmit}
              >
                Kirim
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    templateId: state.emailBlaster.templateId,
    surveiId: state.emailBlaster.surveiId,
    recipients: state.emailBlaster.recipients,
  });

  const mapDispatchToProps = dispatch => ({});

  return authorize({
    mustVerified: false,
    roles: [authorize.STAFF, authorize.SUPERUSER],
  })(
    withRouter(
      connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
