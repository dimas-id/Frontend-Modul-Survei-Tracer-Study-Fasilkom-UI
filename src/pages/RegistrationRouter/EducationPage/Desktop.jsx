import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { FieldArray, Formik } from "formik";
import keymirror from "keymirror";
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Container } from "../../../components/Container";
import { authorize } from "../../../components/hocs/auth";
import { Validation } from "../../../components/hocs/form";
import { NavbarAuth } from "../../../components/stables/Navbar";
import { getDateFormatted } from "../../../libs/datetime";
import PROGRAMS from "../../../libs/studyProgram";
import { createEducations } from "../../../modules/experience/thunks";
import { Guidelines } from "../../../styles";

const styles = () => ({
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  subtitle: {
    ...Guidelines.layouts.mb48,
    fontSize: 20,
  },
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
  submitBtn: {
    ...Guidelines.layouts.mt64,
    ...Guidelines.layouts.mb24,
    color: "white",
  },
  select: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.mb16,
  },
});

const FIELDS = keymirror({
  degreeAndStudyPrograms: null,
  csuiClassYear: null,
  csuiProgram: null,
  uiSsoNpm: null,
});

function getInitialValues() {
  const {
    degreeAndStudyPrograms,
    csuiClassYear,
    csuiProgram,
    uiSsoNpm,
  } = FIELDS;
  return {
    [degreeAndStudyPrograms]: [
      {
        [csuiClassYear]: moment("1986-01-01"),
        [csuiProgram]: "",
        [uiSsoNpm]: "",
      },
    ],
  };
}

const VALIDATOR = Validation.object().shape({
  [FIELDS.degreeAndStudyPrograms]: Validation.array().of(
    Validation.object().shape({
      [FIELDS.csuiClassYear]: Validation.string().required("Wajib diisi"),
      [FIELDS.csuiProgram]: Validation.string().required("Wajib diisi"),
      [FIELDS.uiSsoNpm]: Validation.string().notRequired(),
    })
  ),
});

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

const EducationPage = ({ classes, createEducations }) => {
  const onSubmit = values => {
    const currentValues = { ...values[FIELDS.degreeAndStudyPrograms] };
    let payload = [];
    for (let i = 0; i < Object.keys(currentValues).length; i++) {
      payload.push({
        ui_sso_npm: currentValues[i][FIELDS.uiSsoNpm],
        csui_class_year: getDateFormatted(
          currentValues[i][FIELDS.csuiClassYear],
          "YYYY"
        ),
        csui_program: currentValues[i][FIELDS.csuiProgram],
      });
    }
    createEducations(payload);
  };

  return (
    <React.Fragment>
      <NavbarAuth />
      <Container>
        <Typography className={classes.title} variant="h5" component="h3">
          Riwayat Pendidikan di Fasilkom UI
        </Typography>
        <Typography className={classes.subtitle} component="p">
          Formulir informasi terkait riwayat pendidikan Anda selama di Fasilkom
          UI
        </Typography>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={onSubmit}
          validationSchema={VALIDATOR}
          validateOnChange={false}
        >
          {({ handleSubmit, values, errors, setFieldValue, touched }) => (
            <form className={classes.form}>
              <FieldArray
                name={FIELDS.degreeAndStudyPrograms}
                render={arrayHelpers => (
                  <section style={{ width: "100%" }}>
                    {values[FIELDS.degreeAndStudyPrograms].map((d, i) => (
                      <Grid
                        container
                        spacing={24}
                        style={{ marginTop: "1rem" }}
                      >
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
                                ? errors[FIELDS.degreeAndStudyPrograms][i]
                                    .uiSsoNpm
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
                                ? errors[FIELDS.degreeAndStudyPrograms][i]
                                    .csuiProgram
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
                        disabled={
                          values[FIELDS.degreeAndStudyPrograms].length >= 3
                        }
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
              <button onClick={handleSubmit}>submit aja</button>
            </form>
          )}
        </Formik>
        <div style={{ paddingBottom: "4rem" }} />
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  createEducations: payload => dispatch(createEducations(payload)),
});

export default authorize({ mustVerified: false })(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(EducationPage))
);
