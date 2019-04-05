import React from "react";
import Dialog from "@material-ui/core/Dialog";
import NavbarModal from "../stables/Navbar/NavbarModal";

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

export default FormDialog;
