import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import classNames from "classnames";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBackOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";

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
  buttonBack: {
    color: "#F15353",
    borderColor: "#F15353",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
}));

function NavbarEmailBatch({history, title, ButtonSubmitProps}) {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Button
          variant="outlined"
          color="secondary"
          className={classNames(classes.button, classes.buttonBack)}
          onClick={history.goBack}
        >
          <BackIcon className={classes.leftIcon} />
          Batal
        </Button>
        {title && (
          <Typography variant="h5" align="center" className={classes.grow}>
            {title}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          {...ButtonSubmitProps}
        >
          <SaveIcon className={classes.leftIcon} />
          Simpan
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavbarEmailBatch.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  content: PropTypes.func,
};

NavbarEmailBatch.defaultProps = {
  title: "",
  content: null,
};

export default withRouter(NavbarEmailBatch);
