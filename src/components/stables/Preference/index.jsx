import React from "react";
import { connect } from "react-redux";
import keymirror from "keymirror";
import get from "lodash/get";

import { makeStyles } from "@material-ui/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

import { LineLoader } from "../../Loading";
import atlasV1 from "../../../modules/api/atlas/v1";
import { getUserId } from "../../../modules/session/selectors";
import { Guidelines } from "../../../styles";

const styles = makeStyles(theme => ({
  head: {
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.mb16,
    ...Guidelines.layouts.mt16,
    display: "flex",
    justifyContent: "space-between",
  },
  preference: {
    ...Guidelines.fonts.normal,
    ...Guidelines.layouts.flexMiddle,
    fontSize: 20
  },
  switch: {
    display: "flex",
    alignItems: "center"
  },
  snackbar: {
    margin: theme.spacing.unit
  }
}));

const FIELDS = keymirror({
  couldContactMe: null,
  shouldSendEvent: null,
  shouldSendUpdate: null,
  shouldSendVacancy: null,
  shouldSendNewsletter: null,
  shouldSendDonationInfo: null
});

function Head(props) {
  const classes = styles();
  return (
    <div className={classes.head}>
      {props.loading ? (
        <div style={{ maxHeight: 52 }}>
          <LineLoader width="100%" height="52" />
        </div>
      ) : (
        <React.Fragment>
          <Typography
            className={classes.preference}
            variant="body1"
            component="p"
          >
            {props.children}
          </Typography>
          {props.onChange && (
            <Switch className={classes.switch} {...props} color="primary" />
          )}
        </React.Fragment>
      )}
    </div>
  );
}

function Preference({ userId }) {
  const classes = styles();
  const [loading, setLoading] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState("");
  const [preference, setPreference] = React.useState({
    [FIELDS.couldContactMe]: false,
    [FIELDS.shouldSendEvent]: false,
    [FIELDS.shouldSendUpdate]: false,
    [FIELDS.shouldSendVacancy]: false,
    [FIELDS.shouldSendDonationInfo]: false,
    [FIELDS.shouldSendNewsletter]: false
  });

  const getResult = res => get(res, "data.preference");

  React.useEffect(() => {
    atlasV1.session
      .getPreference(userId)
      .then(result => {
        setPreference(getResult(result));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleChange({ target }) {
    // set first, think later
    setPreference({ ...preference, [target.name]: target.checked });
    atlasV1.session
      .patchPreference(userId, {
        [target.name]: target.checked
      })
      .then(result => {
        setPreference(getResult(result));
        setSnackbar("Berhasil disimpan");
      })
      .catch(() => {
        setSnackbar("Gagal disimpan");
      });
  }

  return (
    <React.Fragment>
      {loading ? (
        Array.apply(null, Array(5)).map(index => <Head loading key={index} />)
      ) : (
        <React.Fragment>
          <Head
            name={FIELDS.shouldSendNewsletter}
            onChange={handleChange}
            checked={preference[FIELDS.shouldSendNewsletter]}
          >
            Newsletter
          </Head>
          <Head
            name={FIELDS.shouldSendEvent}
            onChange={handleChange}
            checked={preference[FIELDS.shouldSendEvent]}
          >
            Informasi/Undangan Acara
          </Head>
          <Head
            name={FIELDS.shouldSendVacancy}
            onChange={handleChange}
            checked={preference[FIELDS.shouldSendVacancy]}
          >
            Informasi Lowongan
          </Head>
          <Head
            name={FIELDS.shouldSendDonationInfo}
            onChange={handleChange}
            checked={preference[FIELDS.shouldSendDonationInfo]}
          >
            Informasi Donasi
          </Head>
          <Head
            name={FIELDS.shouldSendUpdate}
            onChange={handleChange}
            checked={preference[FIELDS.shouldSendUpdate]}
          >
            Informasi lainnya mengenai ILUNI12
          </Head>
        </React.Fragment>
      )}
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={Boolean(snackbar)}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbar}</span>}
      />
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    userId: getUserId(state)
  });
  return connect(
    mapStateToProps,
    null
  )(Preference);
}

export default createContainer();
