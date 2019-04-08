import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import NavbarModal from "../stables/Navbar/NavbarModal";
import withMobileDialog from '@material-ui/core/withMobileDialog';

function FormDialog({ title, children, open, onClose, ...dialogProps }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      {...dialogProps}
    >
      <NavbarModal title={title} onClick={onClose} />
      {children}
    </Dialog>
  );
}

FormDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(FormDialog);
