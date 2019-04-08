import React from "react";
import { connect } from "react-redux";
import omit from "lodash/omit";

import moment from 'moment';
import keymirror from "keymirror";
import { Formik } from "formik";

import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";

import { getDateFormatted } from "../../../../libs/datetime";
import {
  createPositions,
  updateWorkPositionById,
  deleteWorkPositionById
} from "../../../../modules/experience/thunks";
import { getWorkPositionById } from "../../../../modules/experience/selectors";
import { Validation } from "../../../hocs/form";

const FIELDS = keymirror({
  title: null,
  companyName: null,
  industryName: null,
  locationName: null,
  isCurrent: null,
  dateStarted: null,
  dateEnded: null
});

const VALIDATOR = Validation.object().shape({
  [FIELDS.title]: Validation.string()
    .required()
    .max(64),
  [FIELDS.companyName]: Validation.string()
    .required()
    .max(64),
  [FIELDS.industryName]: Validation.string()
    .required()
    .max(64),
  [FIELDS.locationName]: Validation.string()
    .required()
    .max(64),
  [FIELDS.isCurrent]: Validation.bool().notRequired(),
  [FIELDS.dateStarted]: Validation.date().required(),
  [FIELDS.dateEnded]: Validation.date()
    .notRequired()
    .nullable()
});

function getBlankValues() {
  return {
    [FIELDS.title]: "",
    [FIELDS.companyName]: "",
    [FIELDS.industryName]: "",
    [FIELDS.locationName]: "",
    [FIELDS.isCurrent]: false,
    [FIELDS.dateStarted]: moment(),
    [FIELDS.dateEnded]: null
  };
}

function PositionForm({
  currentPosition,
  update,
  afterSubmit,
  positionId,
  createPos,
  updatePos,
  deletePos
}) {
  function submit(values, { setSubmitting }) {
    const payload = { ...omit(values, [FIELDS.isCurrent]) };
    payload[FIELDS.dateStarted] = getDateFormatted(values[FIELDS.dateStarted]);
    if (!values[FIELDS.isCurrent]) {
      payload[FIELDS.dateEnded] = getDateFormatted(values[FIELDS.dateEnded]);
    } else {
      payload[FIELDS.dateEnded] = null
    }

    const submitAction = update ? updatePos : createPos;
    const params = update ? [positionId, payload] : [payload];
    submitAction(...params)
      .then(afterSubmit)
      .catch(e => e)
      .finally(() => {
        setSubmitting(false);
      });
  }

  function validate(values) {
    const dateEnded = values[FIELDS.dateEnded];
    const isCurrent = values[FIELDS.isCurrent];
    const errors = {};
    if (!isCurrent && !Boolean(dateEnded)) {
      errors[FIELDS.dateEnded] = `${FIELDS.dateEnded} is a required field`;
    }

    return errors;
  }

  return (
    <Formik
      initialValues={currentPosition || getBlankValues()}
      validationSchema={VALIDATOR}
      validate={validate}
      isInitialValid={update}
      onSubmit={submit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting
      }) => (
        <form id="positionForm">
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name={FIELDS.title}
                  label="Jabatan"
                  error={errors[FIELDS.title] && touched[FIELDS.title]}
                  value={values[FIELDS.title]}
                  helperText={errors[FIELDS.title]}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name={FIELDS.companyName}
                  label="Nama Perusahaan"
                  error={
                    errors[FIELDS.companyName] && touched[FIELDS.companyName]
                  }
                  value={values[FIELDS.companyName]}
                  helperText={errors[FIELDS.companyName]}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name={FIELDS.industryName}
                  label="Industri"
                  error={
                    errors[FIELDS.industryName] && touched[FIELDS.industryName]
                  }
                  value={values[FIELDS.industryName]}
                  helperText={errors[FIELDS.industryName]}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={FIELDS.isCurrent}
                      checked={values[FIELDS.isCurrent]}
                      value={FIELDS.isCurrent}
                      onChange={handleChange}
                    />
                  }
                  label="Masih bekerja di sini"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name={FIELDS.locationName}
                  label="Lokasi"
                  error={
                    errors[FIELDS.locationName] && touched[FIELDS.locationName]
                  }
                  value={values[FIELDS.locationName]}
                  helperText={errors[FIELDS.locationName]}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDatePicker
                    name={FIELDS.dateStarted}
                    label="Tanggal Mulai"
                    format="YYYY-MM-DD"
                    error={
                      errors[FIELDS.dateStarted] && touched[FIELDS.dateStarted]
                    }
                    value={values[FIELDS.dateStarted]}
                    helperText={errors[FIELDS.dateStarted]}
                    onChange={date => setFieldValue(FIELDS.dateStarted, date)}
                    margin="dense"
                    variant="outlined"
                    clearable
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDatePicker
                    name={FIELDS.dateEnded}
                    label="Tanggal Selesai"
                    format="YYYY-MM-DD"
                    error={
                      errors[FIELDS.dateEnded] && touched[FIELDS.dateEnded]
                    }
                    value={values[FIELDS.dateEnded]}
                    helperText={errors[FIELDS.dateEnded]}
                    onChange={date => setFieldValue(FIELDS.dateEnded, date)}
                    disabled={values[FIELDS.isCurrent]}
                    margin="dense"
                    variant="outlined"
                    clearable
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {update && (
              <Button
                color="secondary"
                onClick={() => deletePos(positionId).then(afterSubmit)}
              >
                Hapus
              </Button>
            )}
            <Button
              color="primary"
              disabled={isSubmitting}
              type="submit"
              onClick={handleSubmit}
            >
              Simpan
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}

function createContainer() {
  const mapStateToProps = (state, { positionId }) => ({
    currentPosition: getWorkPositionById(state, positionId)
  });

  const mapDispatchToProps = dispatch => ({
    createPos: payload => dispatch(createPositions(payload)),
    updatePos: (positionId, payload) =>
      dispatch(updateWorkPositionById(positionId, payload)),
    deletePos: positionId => dispatch(deleteWorkPositionById(positionId))
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PositionForm);
}

export default createContainer();
