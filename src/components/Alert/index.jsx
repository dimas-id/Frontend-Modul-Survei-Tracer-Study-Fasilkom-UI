import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { utilityActions } from "../../modules/utility";
import { getAlert, isShowAlert } from "../../modules/utility/selectors";

function AlertDialog({ alert, open, hide }) {
  const { title, message, onPositive, onNegative } = alert || {};

  function withHide(func) {
    return (e) => {
      func && func(e);
      hide();
    };
  }

  return (
    <Dialog
      open={open}
      onClose={hide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onNegative && (
          <Button onClick={withHide(onNegative)} color="secondary">
            Tidak
          </Button>
        )}
        <Button onClick={withHide(onPositive)} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  state => ({
    open: isShowAlert(state),
    alert: getAlert(state)
  }),
  dispatch => ({
    hide: () => dispatch(utilityActions.hideAlert())
  })
)(AlertDialog);
