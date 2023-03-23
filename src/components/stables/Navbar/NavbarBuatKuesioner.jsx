import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import TextInput from "../../Input/TextInput";
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

function NavbarBuatKuesioner({ classes, history, onSubmit, isLoading }) {
  const [nama, setNama] = useState("");

  function namaChangeHandler(val) {
    setNama(val);
  }

  function onSubmitHandler() {
    onSubmit(nama);
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
            <form
              action=""
              method="POST"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                marginBottom: "5px",
                width: "60%",
              }}
            >
              <TextInput
                value={nama}
                valHandler={namaChangeHandler}
                id="title"
                placeholder="Nama survei"
              />
            </form>
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isLoading ? (
                <button
                  onClick={onSubmitHandler}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#00C7E5",
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

NavbarBuatKuesioner.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default withRouter(withStyles(styles)(NavbarBuatKuesioner));
