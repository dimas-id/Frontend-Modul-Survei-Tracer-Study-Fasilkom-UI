import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import emailBlasterAPI from "../../../modules/api/atlas/v3/email-blaster";
import { NavbarAuth } from "../../../components/stables/Navbar";
import EmailSendPreview from "../../../components/stables/EmailSendPreview";
import { Container } from "../../../components/Container";
import { Guidelines } from "../../../styles";
import { authorize } from "../../../components/hocs/auth";
import { EMAIL_BLASTER_EMAIL_TEMPLATE, EMAIL_BLASTER_RECIPIENT, LIHAT_SURVEI } from "../../paths";
import Toast from "../../../components/Toast";
import SendConfirmationModal from "../../../components/stables/Modal/SendConfimationModal";
import NavbarBackEmailBlasterForm from "../../../components/stables/Navbar/NavbarBackEmailBlasterForm";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mb32,
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
  const [open, setOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (surveiId == null) {
      history.push(LIHAT_SURVEI);
      Toast("Pilih survei terlebih dahulu!", "error");
    }
    if (templateId == null) {
      history.push(EMAIL_BLASTER_EMAIL_TEMPLATE);
      Toast("Pilih template terlebih dahulu!", "error");
      return;
    }
    if (!recipients || recipients.length === 0) {
      history.push(EMAIL_BLASTER_RECIPIENT);
      Toast("Pilih recipient terlebih dahulu!", "error");
    }
    if (templateId == null) {
      history.push(EMAIL_BLASTER_EMAIL_TEMPLATE);
      Toast("Pilih template email terlebih dahulu!", "error");
    }

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
    handleOpen();
  };

  const onSend = () => {
    if (isSending) {
      Toast("Sedang menunggu hasil dari server", "info");
    }
    setIsSending(true);
    emailBlasterAPI
      .sendEmail(templateId, surveiId, recipients)
      .then(res => {
        handleClose();
        Toast("Email dalam proses pengiriman!", "success");
        setTimeout(() => {
          history.push(LIHAT_SURVEI);
        }, 2000);
      })
      .catch(err => {
        Toast("Gagal mengirim email, harap coba kembali.", "error");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <React.Fragment>
      <NavbarAuth title="Kirim Email" />
      <NavbarBackEmailBlasterForm onClick={onSubmit} title="KIRIM" />
      <Container className={classes.container}>
        <EmailSendPreview
          recipients={recipientsState}
          subject={subject}
          body={body}
        />
      </Container>
      <ToastContainer />
      <SendConfirmationModal
        open={open}
        handleClose={handleClose}
        onSend={onSend}
      />
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
