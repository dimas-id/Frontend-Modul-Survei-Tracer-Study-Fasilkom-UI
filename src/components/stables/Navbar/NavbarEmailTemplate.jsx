import React from "react";
import {Link} from "react-router-dom";

import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";
import Navbar from "./Navbar";

import paths from "../../../pages/paths";

const styles = theme => ({
  rightAlign: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    display: "flex",
  },
  leftAlign: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function ButtonsEmailTemplate({classes}) {
  return (
    <div>
      <div className={classes.leftAlign}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          to={paths.CRM_EMAIL_TEMPLATE_CREATE}
          component={Link}
        >
          <AddIcon className={classes.leftIcon} />
          Buat Templat
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button}
        >
          <EmailIcon className={classes.leftIcon} />
          Email Blaster
        </Button>
      </div>
    </div>
  );
}

export function NavbarEmailTemplate({title, ...contentProps}) {
  return (
    <Navbar
      title={title}
      content={<ButtonsEmailTemplate {...contentProps} />}
    />
  );
}

export default withStyles(styles)(NavbarEmailTemplate);
