import React from "react";
import keymirror from "keymirror";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";

import { Guidelines } from "../../../../styles";
import { enhanceForm, Validation } from "../../../../components/hocs/form";

const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    boxSizing: "border-box"
  },
  formContent: {
    ...Guidelines.layouts.flexDirRow
  },
  field: {
    minWidth: "100%",
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.flex1,
    color: "black"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    height: 48
  },
  select: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.mb16
  }
});

const PROGRAMS = [
  {
    value: "S1-SI",
    label: "S1 - Sistem Informasi"
  },
  {
    value: "S1-IK",
    label: "S1 - Ilmu Komputer"
  }
];

const FIELDS = keymirror({
  firstName: null,
  lastName: null,
  birthdate: null,
  latestCsuiClassYear: null,
  latestCsuiProgram: null,
  uiSsoNpm: null,
  email: null,
  password: null,
  repassword: null
});

const VALIDATOR = Validation.object().shape({
  [FIELDS.firstName]: Validation.string().required("Wajib diisi"),
  [FIELDS.lastName]: Validation.string().required("Wajib diisi"),
  [FIELDS.birthdate]: Validation.date().required("Wajib diisi"),
  [FIELDS.latestCsuiClassYear]: Validation.date().required("Wajib diisi"),
  [FIELDS.latestCsuiProgram]: Validation.string().required("Wajib diisi"),
  [FIELDS.uiSsoNpm]: Validation.number()
    .required("Wajib diisi")
    .min(16, "Tepat 16")
    .max(16, "Tepat 16"),
  [FIELDS.email]: Validation.string()
    .email("Email tidak valid")
    .required("Wajib diisi"),
  [FIELDS.repassword]: Validation.string().required("Wajib diisi"),
  [FIELDS.password]: Validation.string()
    .required("Wajib diisi")
    .matches("^(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$")
});

function SelectPrograms(props) {
  return (
    <FormControl
      variant="outlined"
      className={`${props.classes.field} ${props.classes.select}`}
    >
      <InputLabel htmlFor="LatestCsuiProgram">
        Gelar dan Program Studi Terakhir
      </InputLabel>
      <Select
        value={props.value}
        onChange={props.onChange}
        required
        input={
          <OutlinedInput
            id="LatestCsuiProgram"
            labelWidth={240}
            name={FIELDS.latestCsuiProgram}
          />
        }
      >
        {PROGRAMS.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
            selected={props.value === item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const RegistrationForm = withStyles(styles)(
  ({
    classes,
    isSubmitting,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    touched
  }) => {
    return (
      <form className={classes.form}>
        <Typography>{errors[FIELDS.repassword]}</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ paddingBottom: 0 }}>
            <Typography color="error">* Wajib diisi</Typography>
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            <TextField
              autoFocus
              id="FirstName"
              label="Nama Depan"
              className={classes.field}
              margin="normal"
              variant="outlined"
              required
              value={values[FIELDS.firstName]}
              error={touched[FIELDS.firstName] && !!errors[FIELDS.firstName]}
              helperText={errors[FIELDS.firstName]}
              onChange={t => setFieldValue(FIELDS.firstName, t.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            <TextField
              id="LastName"
              label="Nama Belakang"
              className={classes.field}
              margin="normal"
              variant="outlined"
              required
              value={values[FIELDS.lastName]}
              error={touched[FIELDS.lastName] && !!errors[FIELDS.lastName]}
              helperText={errors[FIELDS.lastName]}
              onChange={t => setFieldValue(FIELDS.lastName, t.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="Email"
              label="Email"
              autoComplete="email"
              className={classes.field}
              margin="normal"
              variant="outlined"
              required
              value={values[FIELDS.email]}
              error={touched[FIELDS.email] && !!errors[FIELDS.email]}
              helperText={errors[FIELDS.email]}
              onChange={t => setFieldValue(FIELDS.email, t.target.value)}
              inputProps={{
                type: "email"
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDatePicker
                className={classes.field}
                clearable
                variant="outlined"
                margin="normal"
                label="Tanggal Lahir"
                value={values[FIELDS.birthdate]}
                error={touched[FIELDS.birthdate] && !!errors[FIELDS.birthdate]}
                helperText={errors[FIELDS.birthdate]}
                onChange={date => setFieldValue(FIELDS.birthdate, date)}
                format="YYYY-MM-DD"
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="Password"
              label="Password"
              autoComplete="current-password"
              className={classes.field}
              margin="normal"
              variant="outlined"
              required
              value={values[FIELDS.password]}
              inputProps={{
                type: "password"
              }}
              error={touched[FIELDS.password] && !!errors[FIELDS.password]}
              helperText={errors[FIELDS.password]}
              onChange={t => setFieldValue(FIELDS.password, t.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="Repassword"
              label="Konfirmasi Password"
              className={classes.field}
              margin="normal"
              variant="outlined"
              required
              value={values[FIELDS.repassword]}
              inputProps={{
                type: "password"
              }}
              error={touched[FIELDS.repassword] && !!errors[FIELDS.repassword]}
              helperText={errors[FIELDS.repassword]}
              onChange={t => setFieldValue(FIELDS.repassword, t.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDatePicker
                label="Angkatan"
                className={classes.field}
                value={values[FIELDS.latestCsuiClassYear]}
                onChange={date =>
                  setFieldValue(FIELDS.latestCsuiClassYear, date)
                }
                error={
                  touched[FIELDS.latestCsuiClassYear] &&
                  !!errors[FIELDS.latestCsuiClassYear]
                }
                helperText={errors[FIELDS.latestCsuiClassYear]}
                margin="normal"
                variant="outlined"
                format="YYYY"
                views={["year"]}
                clearable
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="NPM"
              label="NPM"
              className={classes.field}
              margin="normal"
              variant="outlined"
              value={values[FIELDS.uiSsoNpm]}
              error={touched[FIELDS.uiSsoNpm] && !!errors[FIELDS.uiSsoNpm]}
              helperText={errors[FIELDS.uiSsoNpm]}
              onChange={t => setFieldValue(FIELDS.uiSsoNpm, t.target.value)}
              inputProps={{
                type: "number",
                maxLength: 10
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectPrograms
              classes={classes}
              value={values[FIELDS.latestCsuiProgram]}
              onChange={e =>
                setFieldValue(FIELDS.latestCsuiProgram, e.target.value)
              }
              error={
                touched[FIELDS.latestCsuiProgram] &&
                !!errors[FIELDS.latestCsuiProgram]
              }
              helperText={errors[FIELDS.latestCsuiProgram]}
            />
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12}>
            <Button
              className={classes.btn}
              disabled={isSubmitting}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              {isSubmitting ? (
                <Fade in>
                  <CircularProgress size={18} />
                </Fade>
              ) : (
                "Daftar"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
);

const enhancedRegistrationForm = enhanceForm({
  displayName: "RegistrationForm",
  validator: VALIDATOR
})(RegistrationForm);
enhancedRegistrationForm.fields = FIELDS;

export default enhancedRegistrationForm;
