import { Button, Modal, Paper, Typography } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import React from "react";

const styles = theme => ({
  modal: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    padding: 32,
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 32,
  },
  button: {
    marginLeft: 16,
  },
});

function SendConfimationModal({ classes, open, handleClose, onSend }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Apakah Anda yakin akan mengirim email?
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="seconday"
            className={classes.button}
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSend}
          >
            Kirim
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

export default withStyles(styles)(SendConfimationModal);
