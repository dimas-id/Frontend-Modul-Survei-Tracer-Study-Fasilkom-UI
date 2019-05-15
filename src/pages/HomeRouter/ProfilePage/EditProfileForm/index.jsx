import React from "react";
import { connect } from "react-redux";
import keymirror from "keymirror";
import { Formik } from "formik";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

import { humanizeError } from "../../../../libs/response";
import { Validation } from "../../../../components/hocs/form";
import { getUser } from "../../../../modules/session/selectors";
import { updateUserProfile } from "../../../../modules/session/thunks";
import { Guidelines } from "../../../../styles";

const styles = theme => ({
  textField: {
    ...Guidelines.layouts.w100,
  },
});

const FIELDS = keymirror({
  name: null,
  birthdate: null,
  email: null,
  phoneNumber: null,
  websiteUrl: null,
  residenceCity: null,
  residenceCountry: null,
});

const VALIDATOR = Validation.object().shape({
  [FIELDS.phoneNumber]: Validation.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
      "Nomor telepon tidak sesuai"
    )
    .required("Nomor telepon diperlukan"),
  [FIELDS.websiteUrl]: Validation.string().notRequired(),
});

function EditProfileForm({ classes, update, user, onSuccess }) {
  function handleSubmit(values, actions) {
    update(values)
      .then(resp => {
        onSuccess && onSuccess(resp);
      })
      .catch(({ response }) => {
        const errMessages = humanizeError(response.data.profile, [
          FIELDS.phoneNumber,
          FIELDS.websiteUrl,
        ]);
        errMessages && actions.setErrors(errMessages);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  function getInitialValues() {
    return {
      [FIELDS.name]: user[FIELDS.name],
      [FIELDS.email]: user[FIELDS.email],
      [FIELDS.birthdate]: user.profile[FIELDS.birthdate],
      [FIELDS.residenceCity]: user.profile[FIELDS.residenceCity] || "",
      [FIELDS.residenceCountry]: user.profile[FIELDS.residenceCountry] || "",
      [FIELDS.phoneNumber]: user.profile[FIELDS.phoneNumber] || "",
      [FIELDS.websiteUrl]: user.profile[FIELDS.websiteUrl] || "",
    };
  }

  return (
    <React.Fragment>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={VALIDATOR}
        initialValues={getInitialValues()}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => {
          return (
            <React.Fragment>
              <DialogContent>
                <form>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Nama Lengkap"
                        disabled
                        value={values[FIELDS.name]}
                        helperText="Ubah dengan verifikasi ulang, Nama menjadi permanen jika sudah terverifikasi."
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-email"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Email"
                        disabled
                        value={values[FIELDS.email]}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-birthdate"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Tanggal Lahir"
                        disabled
                        value={values[FIELDS.birthdate]}
                        helperText="Ubah dengan verifikasi ulang, Tanggal lahir menjadi permanen jika sudah terverifikasi."
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="outlined-residence-city"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Kota Tinggal"
                        name={FIELDS.residenceCity}
                        value={values[FIELDS.residenceCity]}
                        error={errors[FIELDS.residenceCity]}
                        helperText={errors[FIELDS.residenceCity]}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-residence-country"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Negara Tinggal"
                        name={FIELDS.residenceCountry}
                        value={values[FIELDS.residenceCountry]}
                        error={errors[FIELDS.residenceCountry]}
                        helperText={errors[FIELDS.residenceCountry]}
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-phone-number"
                        type="tel"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        label="Nomor Telepon"
                        name={FIELDS.phoneNumber}
                        value={values[FIELDS.phoneNumber]}
                        error={errors[FIELDS.phoneNumber]}
                        helperText={errors[FIELDS.phoneNumber]}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-website"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="url"
                        label="URL Website Pribadi"
                        name={FIELDS.websiteUrl}
                        value={values[FIELDS.websiteUrl]}
                        error={errors[FIELDS.websiteUrl]}
                        helperText={errors[FIELDS.websiteUrl]}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </DialogActions>
            </React.Fragment>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  dispatch => ({
    update: payload => dispatch(updateUserProfile(payload)),
  })
)(withStyles(styles)(EditProfileForm));
