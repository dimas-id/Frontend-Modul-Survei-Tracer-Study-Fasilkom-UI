import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

import NavbarBack from "./NavbarBack";
import paths from "../../../pages/paths";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";
import {Grid} from "@material-ui/core";

class NavbarBackEmailTemplate extends React.Component {
  render() {
    const {classes, ...otherProps} = this.props;

    return (
      <NavbarBack
        {...otherProps}
        Content={
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              size="small"
              to={paths.CRM_EMAIL_TEMPLATE_CREATE}
              component={Link}
            >
              <AddIcon />
              Buat Templat
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{marginLeft: 8}}
            >
              <EmailIcon />
              Email Blaster
            </Button>
          </React.Fragment>
        }
      />
    );
  }
}

export default NavbarBackEmailTemplate;
