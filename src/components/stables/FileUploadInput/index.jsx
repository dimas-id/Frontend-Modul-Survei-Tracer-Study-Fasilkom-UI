import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";

import { humanizeError } from "../../../libs/response"
import http from "../../../libs/http";
import env from "../../../config";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  input: {
    display: "none"
  },
  buttonSuccess: {
    pointer: "cursor",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  snackbar: {
    margin: theme.spacing.unit
  }
});

function FileUploadInput({ onChange, accept, classes }) {
  const inputRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showSnackbars, setShowSnackbars] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const buttonClassname = classNames({
    [classes.buttonSuccess]: success
  });

  function handleOnChange(e) {
    const { files } = e.target;
    if (!loading && files.length > 0) {
      setSuccess(false);
      setLoading(true);

      const data = new FormData();
      data.append("file", files[0]);
      const config = {
        onUploadProgress: function(progressEvent) {
          setProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }
      };

      const URI = `${accept}`.includes("image") ? "image" : "file";
      const UPLOAD_ENPOINT = `${env.HELIOS}/api/v1/upload/${URI}`;
      http
        .put(UPLOAD_ENPOINT, data, config)
        .then(function(res) {
          setShowSnackbars("Upload completed");
          setSuccess(true);
          return onChange && onChange(res);
        })
        .catch(function(err) {
          const readable = humanizeError(err.response.data, ['file'])
          setShowSnackbars(`Upload failed: ${readable.file}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <React.Fragment>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={Boolean(showSnackbars)}
        autoHideDuration={4000}
        onClose={() => setShowSnackbars(false)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{showSnackbars}</span>}
      />
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <label htmlFor="button-file">
            <input
              ref={inputRef}
              accept={accept}
              className={classes.input}
              id="button-file"
              type="file"
              onChange={handleOnChange}
            />
            <Fab
              color="primary"
              className={buttonClassname}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
          </label>
          {loading && (
            <CircularProgress
              size={68}
              className={classes.fabProgress}
              value={progress}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

FileUploadInput.propTypes = {
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(FileUploadInput);
