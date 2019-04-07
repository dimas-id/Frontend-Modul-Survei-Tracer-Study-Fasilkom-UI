import React from "react";
import { connect } from "react-redux";
import keymirror from "keymirror";
import get from "lodash/get";

import { makeStyles } from "@material-ui/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

import { ListLoader } from "../../Loading";
import atlasV1 from "../../../modules/api/atlas/v1";
import { getUserId } from "../../../modules/session/selectors";
import { Guidelines } from "../../../styles";

const styles = makeStyles(theme => ({
  head: {
    ...Guidelines.layouts.w100,
    display: "flex",
    justifyContent: "space-between"
  },
  preference: {
    ...Guidelines.layouts.mb32,
    ...Guidelines.fonts.normal,
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

function Head(props) {
  const classes = styles();
  return (
    <div className={classes.head}>
      <Typography className={classes.preference} variant="h5" component="h3">
        {props.children}
      </Typography>
      {props.onChange && (
        <Switch className={classes.switch} {...props} color="primary" />
      )}
    </div>
  );
}

const FIELDS = keymirror({
  couldContactMe: null,
  shouldSendEvent: null,
  shouldSendUpdate: null,
  shouldSendVacancy: null,
  shouldSendNewsletter: null,
  shouldSendDonationInfo: null
});

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
    atlasV1.session
      .patchPreference(userId, {
        [target.name]: target.value
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
        <ListLoader />
      ) : (
        <React.Fragment>
          <Head
            name={FIELDS.shouldSendNewsletter}
            onChange={handleChange}
            value={preference[FIELDS.shouldSendNewsletter]}
          >
            Newsletter
          </Head>
          <Head
            name={FIELDS.shouldSendEvent}
            onChange={handleChange}
            value={preference[FIELDS.shouldSendEvent]}
          >
            Informasi/Undangan Acara
          </Head>
          <Head
            name={FIELDS.shouldSendVacancy}
            onChange={handleChange}
            value={preference[FIELDS.shouldSendVacancy]}
          >
            Informasi Lowongan
          </Head>
          <Head
            name={FIELDS.shouldSendDonationInfo}
            onChange={handleChange}
            value={preference[FIELDS.shouldSendDonationInfo]}
          >
            Informasi Donasi
          </Head>
          <Head
            name={FIELDS.shouldSendUpdate}
            onChange={handleChange}
            value={preference[FIELDS.shouldSendUpdate]}
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
