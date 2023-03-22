import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import TextInput from "../../Input/TextInput";

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

function NavbarBuatKuesioner({ classes, history, onSubmit }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  function namaChangeHandler(val) {
    setNama(val);
  }

  function deskripsiChangeHandler(val) {
    setDeskripsi(val);
  }

  function onSubmitHandler() {
    onSubmit(nama, deskripsi);
  }

  return (
    <AppBar position="static" className={classes.appbar}>
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
            <TextInput
              value={deskripsi}
              valHandler={deskripsiChangeHandler}
              id="deskripsi"
              placeholder="tambahkan deskripsi"
            />
          </form>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            >
              Simpan
            </button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

NavbarBuatKuesioner.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func,
};

export default withRouter(withStyles(styles)(NavbarBuatKuesioner));
