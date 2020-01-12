import React from "react";
import ReactDOM from "react-dom";
import keymirror from "keymirror";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";

import { Guidelines } from "../../../styles";
import { enhanceForm, Validation } from "../../../components/hocs/form";
import PROGRAMS from "../../../libs/studyProgram";
import { FieldArray } from "formik";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    boxSizing: "border-box",
  },
  formContent: {
    ...Guidelines.layouts.flexDirRow,
  },
  field: {
    minWidth: "100%",
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.flex1,
    color: "black",
  },
  btn: {
    ...Guidelines.layouts.mt64,
    height: 48,
  },
  select: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.mb16,
  },
});

const FIELDS = keymirror({
  firstName: null,
  lastName: null,
  birthdate: null,
  degreeAndStudyPrograms: null,
  csuiClassYear: null,
  csuiProgram: null,
  uiSsoNpm: null,
});

const VALIDATOR = {
  [FIELDS.firstName]: Validation.string().required("Wajib diisi"),
  [FIELDS.lastName]: Validation.string().required("Wajib diisi"),
  [FIELDS.birthdate]: Validation.date("Tanggal lahir tidak valid").required(
    "Wajib diisi"
  ),
  [FIELDS.degreeAndStudyPrograms]: Validation.array().of(
    Validation.object().shape({
      [FIELDS.csuiClassYear]: Validation.string().required("Wajib diisi"),
      [FIELDS.csuiProgram]: Validation.string().required("Wajib diisi"),
      [FIELDS.uiSsoNpm]: Validation.string().notRequired(),
    })
  ),
};

function SelectPrograms(props) {
  const inputLabelRef = React.useRef(null);

  const index = props.index;

  const [state, setState] = React.useState({
    labelWidth: 0,
  });
  React.useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth,
    });
  }, []);

  return (
    <FormControl
      variant="outlined"
      className={`${props.classes.field} ${props.classes.select}`}
    >
      <InputLabel ref={inputLabelRef} htmlFor={`csuiProgram${index}`}>
        {`Gelar dan Program Studi`}
      </InputLabel>
      <Select
        error={props.error}
        value={props.value}
        onChange={props.onChange}
        input={
          <OutlinedInput
            id={`csuiProgram${index}`}
            labelWidth={state.labelWidth}
            name={FIELDS.csuiProgram}
            required
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
      <FormHelperText
        variant="outlined"
        error={props.error}
        required
        margin="dense"
      >
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
}

const Form = withStyles(styles)(
  ({
    classes,
    isSubmitting,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    touched,
  }) => {
    return (
      <form className={classes.form}>
        <Typography>{errors[FIELDS.repassword]}</Typography>
        <Grid container spacing={24} style={{ margin: "6px 0" }}>
          <Grid item xs={12} style={{ paddingBottom: 0 }}>
            <Typography
              style={{ fontWeight: "bold" }}
              gutterBottom
              variant="h5"
              align="left"
              component="h5"
            >
              Detail Profil
            </Typography>
            <Typography gutterBottom variant="h6" align="left" component="h6">
              Formulir detail profil akun anda
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
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
        </Grid>
        <Grid container spacing={24} style={{ margin: "48px 0 0 0" }}>
          <Grid item xs={12} style={{ paddingBottom: 0 }}>
            <Typography
              style={{ fontWeight: "bold" }}
              gutterBottom
              variant="h5"
              align="left"
              component="h5"
            >
              Riwayat Pendidikan di Fasilkom UI
            </Typography>
            <Typography gutterBottom variant="h6" align="left" component="h6">
              Formulir informasi terkait riwayat pendidikan Anda selama di
              Fasilkom UI
            </Typography>
          </Grid>
        </Grid>
        <FieldArray
          name={FIELDS.degreeAndStudyPrograms}
          render={arrayHelpers => (
            <section style={{ width: "100%" }}>
              {values[FIELDS.degreeAndStudyPrograms].map((d, i) => (
                <Grid container spacing={24} style={{ marginTop: "1rem" }}>
                  <Grid item xs={6} md={6}>
                    <Typography
                      variant="h6"
                      align="left"
                      component="h6"
                      style={{ fontWeight: "bold" }}
                    >
                      Riwayat Pendidikan {i + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} style={{ textAlign: "end" }}>
                    {i > 0 ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          arrayHelpers.remove(i);
                        }}
                      >
                        <DeleteIcon
                          color="primary"
                          style={{ marginRight: "4px" }}
                        />
                        Hapus
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <InlineDatePicker
                        label={`Angkatan`}
                        className={classes.field}
                        value={d[FIELDS.csuiClassYear]}
                        onChange={date =>
                          setFieldValue(
                            `${FIELDS.degreeAndStudyPrograms}[${i}]${
                              FIELDS.csuiClassYear
                            }`,
                            date
                          )
                        }
                        error={
                          touched[d[FIELDS.csuiClassYear]] &&
                          !!errors[d[FIELDS.csuiClassYear]]
                        }
                        helperText={errors[d[FIELDS.csuiClassYear]]}
                        margin="normal"
                        variant="outlined"
                        format="YYYY"
                        views={["year"]}
                        clearable
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id={`NPM${i}`}
                      label={`NPM (opsional)`}
                      className={classes.field}
                      margin="normal"
                      variant="outlined"
                      value={d[FIELDS.uiSsoNpm]}
                      error={
                        touched[FIELDS.degreeAndStudyPrograms] &&
                        touched[FIELDS.degreeAndStudyPrograms][i] &&
                        touched[FIELDS.degreeAndStudyPrograms][i][
                          FIELDS.uiSsoNpm
                        ] &&
                        !!errors[FIELDS.degreeAndStudyPrograms] &&
                        !!errors[FIELDS.degreeAndStudyPrograms][i] &&
                        !!errors[FIELDS.degreeAndStudyPrograms][i][
                          FIELDS.uiSsoNpm
                        ]
                      }
                      helperText={
                        errors[FIELDS.degreeAndStudyPrograms] &&
                        errors[FIELDS.degreeAndStudyPrograms][i]
                          ? errors[FIELDS.degreeAndStudyPrograms][i].uiSsoNpm
                          : undefined
                      }
                      onChange={t =>
                        setFieldValue(
                          `${FIELDS.degreeAndStudyPrograms}[${i}]${
                            FIELDS.uiSsoNpm
                          }`,
                          t.target.value
                        )
                      }
                      inputProps={{
                        maxLength: 10,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectPrograms
                      index={i}
                      classes={classes}
                      value={d[FIELDS.csuiProgram]}
                      onChange={e =>
                        setFieldValue(
                          `${FIELDS.degreeAndStudyPrograms}[${i}]${
                            FIELDS.csuiProgram
                          }`,
                          e.target.value
                        )
                      }
                      error={
                        touched[FIELDS.degreeAndStudyPrograms] &&
                        touched[FIELDS.degreeAndStudyPrograms][i] &&
                        touched[FIELDS.degreeAndStudyPrograms][i][
                          FIELDS.csuiProgram
                        ] &&
                        !!errors[FIELDS.degreeAndStudyPrograms] &&
                        !!errors[FIELDS.degreeAndStudyPrograms][i] &&
                        !!errors[FIELDS.degreeAndStudyPrograms][i][
                          FIELDS.csuiProgram
                        ]
                      }
                      helperText={
                        errors[FIELDS.degreeAndStudyPrograms] &&
                        errors[FIELDS.degreeAndStudyPrograms][i]
                          ? errors[FIELDS.degreeAndStudyPrograms][i].csuiProgram
                          : undefined
                      }
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  style={{ marginTop: "24px" }}
                  className={classes.btn}
                  variant={
                    values[FIELDS.degreeAndStudyPrograms].length >= 3
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  disabled={values[FIELDS.degreeAndStudyPrograms].length >= 3}
                  size="large"
                  onClick={() =>
                    arrayHelpers.push({
                      [FIELDS.csuiClassYear]: moment("1986-01-01"),
                      [FIELDS.csuiProgram]: "",
                      [FIELDS.uiSsoNpm]: "",
                    })
                  }
                >
                  {values[FIELDS.degreeAndStudyPrograms].length >= 3 ? (
                    <AddCircleIcon
                      color="grey"
                      style={{ marginRight: "4px" }}
                    />
                  ) : (
                    <AddCircleIcon
                      color="primary"
                      style={{ marginRight: "4px" }}
                    />
                  )}
                  Tambah Riwayat
                </Button>
              </Grid>
            </section>
          )}
        />
        <Grid container spacin={24}>
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

const IncompleteForm = enhanceForm({
  displayName: "IncompleteForm",
  validator: VALIDATOR,
})(Form);
IncompleteForm.fields = FIELDS;

export default IncompleteForm;
