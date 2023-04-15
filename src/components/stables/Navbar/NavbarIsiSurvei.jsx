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

function NavbarIsiSurvei({ classes, history, namaSurvei }) {
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
            <div>
              <h1>{namaSurvei}</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}></div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavbarIsiSurvei.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  namaSurvei: PropTypes.bool,
};

export default withRouter(withStyles(styles)(NavbarIsiSurvei));
