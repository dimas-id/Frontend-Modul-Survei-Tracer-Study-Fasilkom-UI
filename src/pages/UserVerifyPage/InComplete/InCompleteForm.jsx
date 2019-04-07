import React from "react";
import ReactDOM from "react-dom";
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

import { Guidelines } from "../../../styles";
import { enhanceForm, Validation } from "../../../components/hocs/form";

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
  birthdate: null,
  latestCsuiClassYear: null,
  latestCsuiProgram: null,
  uiSsoNpm: null
});

const VALIDATOR = {
  [FIELDS.birthdate]: Validation.date().required("Wajib diisi"),
  [FIELDS.latestCsuiClassYear]: Validation.date().required("Wajib diisi"),
  [FIELDS.latestCsuiProgram]: Validation.string().required("Wajib diisi"),
  [FIELDS.uiSsoNpm]: Validation.number().notRequired()
};

function SelectPrograms(props) {
  const inputLabelRef = React.useRef(null);

  const [state, setState] = React.useState({
    labelWidth: 0
  });
  React.useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth
    });
  }, []);

  return (
    <FormControl
      variant="outlined"
      className={`${props.classes.field} ${props.classes.select}`}
    >
      <InputLabel ref={inputLabelRef} htmlFor="LatestCsuiProgram">
        Gelar dan Program Studi Terakhir
      </InputLabel>
      <Select
        value={props.value}
        onChange={props.onChange}
        required
        input={
          <OutlinedInput
            id="LatestCsuiProgram"
            labelWidth={state.labelWidth}
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
          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDatePicker
                className={classes.field}
                clearable
                variant="outlined"
                margin="normal"
                label="Tanggal Lahir"
                required
                value={values[FIELDS.birthdate]}
                error={touched[FIELDS.birthdate] && !!errors[FIELDS.birthdate]}
                helperText={errors[FIELDS.birthdate]}
                onChange={date => setFieldValue(FIELDS.birthdate, date)}
                format="YYYY-MM-DD"
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDatePicker
                label="Angkatan"
                className={classes.field}
                required
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
                "Simpan"
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