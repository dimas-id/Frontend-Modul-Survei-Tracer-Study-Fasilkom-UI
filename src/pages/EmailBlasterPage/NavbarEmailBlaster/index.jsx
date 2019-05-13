import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListAlt from "@material-ui/icons/ListAltOutlined";
import SendIcon from "@material-ui/icons/SendOutlined";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined"
import AddIcon from "@material-ui/icons/AddOutlined"

import paths from "../../paths"

const useStyle = makeStyles(theme => ({
  appbar: {
    top: 0,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  btnDel: {
      color: "#E24C4C",
      borderColor: "#E24C4C",
  },
  btnSend: {
    color: "#4CE2A7",
    borderColor: "#4CE2A7",
  },
  btnTemplat: {
    color: "#F1A153",
    borderColor: "#F1A153",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
}));

function NavbarEmailBlaster({ ButtonSendBatchProps, ButtonDeleteBatchProps }) {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Button
          variant="outlined"
          className={classNames(classes.button, classes.btnTemplat)}
          component={Link}
          to={paths.CRM_EMAIL_TEMPLATE_LIST}
        >
          <ListAlt className={classes.leftIcon} />
          Daftar Templat
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          component={Link}
          to={paths.CRM_EMAIL_BATCH_CREATE}
        >
          <AddIcon className={classes.leftIcon} />
          Tambah Batch
        </Button>
        <Button
          variant="outlined"
          className={classNames(classes.button, classes.btnDel)}
          {...ButtonDeleteBatchProps}
        >
          <DeleteIcon className={classes.leftIcon} />
          Hapus Batch
        </Button>
        <div className={classes.grow} />
        <Button
          variant="outlined"
          className={classNames(classes.button, classes.btnSend)}
          {...ButtonSendBatchProps}
        >
          <SendIcon className={classes.leftIcon} />
          Kirim
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavbarEmailBlaster.propTypes = {
  ButtonSendBatchProps: PropTypes.shape().isRequired,
  ButtonDeleteBatchProps: PropTypes.shape().isRequired,
};

export default NavbarEmailBlaster;
