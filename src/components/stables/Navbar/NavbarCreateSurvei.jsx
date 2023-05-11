import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import classe from "./styles.module.css";

const styles = theme => ({
  appbar: {
    top: 0,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function NavbarCreateSurvei({ classes, history, onSubmit, isLoading }) {
  function onSubmitHandler(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={classe.navbar}>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                onClick={history.goBack}
                color="primary"
                variant="contained"
              >
                <ArrowBack />
              </IconButton>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isLoading ? (
                <button
                  onClick={onSubmitHandler}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#4285f4",
                    color: "white",
                    borderRadius: "0.6em",
                    fontWeight: "bolder",
                  }}
                  disabled={isLoading}
                >
                  Simpan
                </button>
              ) : (
                <button
                  onClick={onSubmitHandler}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "grey",
                    color: "white",
                    borderRadius: "0.6em",
                    fontWeight: "bolder",
                  }}
                  disabled
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavbarCreateSurvei.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  namaStatus: PropTypes.bool,
  setNamaStatus: PropTypes.func,
};

export default withRouter(withStyles(styles)(NavbarCreateSurvei));
