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

function NavbarBuatKuesioner({
  classes,
  history,
  onSubmit,
  isLoading,
  namaStatus,
  setNamaStatus,
  namaAwal = ""
}) {
  const [nama, setNama] = useState(namaAwal);

  function namaChangeHandler(val) {
    setNama(val);
    setNamaStatus(true);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
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
              onSubmit={onSubmitHandler}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                marginBottom: "5px",
                width: "60%",
              }}
            >
              <div className={`${namaStatus ? "" : classe.red}`}>
                <TextInput
                  value={nama}
                  valHandler={namaChangeHandler}
                  id="title"
                  placeholder={namaAwal ? namaAwal : "Nama Survei" }
                  status={namaStatus}
                />
              </div>
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
  namaStatus: PropTypes.bool,
  setNamaStatus: PropTypes.func,
};

export default withRouter(withStyles(styles)(NavbarBuatKuesioner));
