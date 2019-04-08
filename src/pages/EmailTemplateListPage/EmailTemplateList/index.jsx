import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import heliosV1 from "../../../modules/api/helios/v1";
import { getDateFormatted } from "../../../libs/datetime";
import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";
import { Guidelines } from "../../../styles";
import { LinesLoaderEmailTemplate } from "../../../components/Loading";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../../components/stables/SnackbarContentWrapper";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: "55vh"
  },
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
});

class EmailTemplateList extends React.Component {
  state = {
    open: true,
    emailTemplateList: null,
    loading: true
  };

  componentDidMount() {
    heliosV1.email
      .getEmailTemplateList()
      .then(result => this.setState({ emailTemplateList: result.data.results }))
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickDelete(idEmailTemplate) {
    window.alertDialog(
      "Konfirmasi Penghapusan", //title
      "Apakah anda yakin menghapus templat ini?", //ms
      () => {
        heliosV1.email
          .deleteEmailTemplate(idEmailTemplate)
          .then(this.handleOpenSuccessMsg)
          .then(() => {
            this.setState({ loading: true })
          })
          .catch(this.handleOpenErrorMsg)
          .finally(() => {
            heliosV1.email
              .getEmailTemplateList()
              .then(result =>
                this.setState({ emailTemplateList: result.data.results })
              )
              .finally(() => {
                this.setState({ loading: false });
              });
          });
      }
    );
  }

  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };

  handleOpenErrorMsg = () => {
    this.setState({ openErrorMsg: true });
  };

  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { classes } = this.props;
    const { emailTemplateList, loading } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            {loading &&
              Array.apply(null, Array(9)).map(() => (
                <LinesLoaderEmailTemplate height="24" />
              ))}

            {!loading &&
              emailTemplateList.map(template => (
                <ListItem
                  button
                  onClick={this.handleClick}
                  to={makePathVariableUri(paths.CRM_EMAIL_TEMPLATE_UPDATE, {
                    idEmailTemplate: template.id
                  })}
                  component={Link}
                >
                  <ListItemText
                    primary={template.title}
                    secondary={`Dibuat pada ${getDateFormatted(
                      template.dateCreated
                    )}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        this.handleClickDelete(template.id);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccessMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccessMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSuccessMsg}
            variant="success"
            message={`Templat Email berhasil dihapus`}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openErrorMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={`Templat Email gagal dihapus`}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}
EmailTemplateList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailTemplateList);
