import React from "react";
import keymirror from "keymirror";
import moment from "moment";
import omit from "lodash/omit";
import { connect } from "react-redux";
import { Validation } from "../../../hocs/form";
import { humanizeError } from "../../../../libs/response";
import { Formik } from "formik";
import { getYearFormatted } from "../../../../libs/datetime";
import { LoadingFill } from "../../../../components/Loading";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "../../../Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { getOtherEduById } from "../../../../modules/experience/selectors";
import {
  createOtherEdus,
  updateOtherEduById,
  deleteOtherEduById,
} from "../../../../modules/experience/thunks";
import univData from "./university.json";

const FIELDS = keymirror({
  country: null,
  university: null,
  program: null,
  degree: null,
  classYear: null,
  isGraduated: null,
  graduationYear: null,
});

const VALIDATOR = Validation.object().shape({
  [FIELDS.country]: Validation.string()
    .required("Pilih negara")
    .max(64),
  [FIELDS.university]: Validation.string()
    .required("Pilih universitas")
    .max(64),
  [FIELDS.program]: Validation.string()
    .required("Program studi wajib diisi")
    .max(64),
  [FIELDS.degree]: Validation.string()
    .required("Pilih jenjang pendidikan")
    .max(64),
  [FIELDS.classYear]: Validation.string().required("Tahun masuk wajib diisi"),
  [FIELDS.isGraduated]: Validation.bool().notRequired(),
  [FIELDS.graduationYear]: Validation.string()
    .notRequired()
    .nullable(),
});

function getBlankValues() {
  return {
    [FIELDS.country]: "",
    [FIELDS.university]: "",
    [FIELDS.program]: "",
    [FIELDS.degree]: "",
    [FIELDS.classYear]: moment("1986-01-01"),
    [FIELDS.isGraduated]: false,
    [FIELDS.graduationYear]: null,
  };
}

function OtherEduForm({
  currentOtherEdu,
  update,
  afterSubmit,
  otherEduId,
  createOtherEdu,
  updateOtherEdu,
  deleteOtherEdu,
}) {
  function submit(values, { setSubmitting, setErrors }) {
    const payload = { ...omit(values) };
    payload[FIELDS.classYear] = getYearFormatted(values[FIELDS.classYear]);
    if (values[FIELDS.isGraduated]) {
      payload[FIELDS.graduationYear] = getYearFormatted(values[FIELDS.graduationYear]);
    } else {
      payload[FIELDS.graduationYear] = null;
    }
    
    const submitAction = update ? updateOtherEdu : createOtherEdu;
    const params = update ? [otherEduId, payload] : [payload];
    submitAction(...params)
      .then(afterSubmit)
      .catch(e => {
        if (e.response) {
          const readable = humanizeError(e.response.data, Object.keys(FIELDS));
          setErrors(readable);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function validate(values) {
    const graduationYear = values[FIELDS.graduationYear];
    const isGraduated = values[FIELDS.isGraduated];
    const errors = {};
    if (isGraduated && !Boolean(graduationYear)) {
      errors[FIELDS.graduationYear] = `Tahun lulus wajib diisi.`;
    }

    return errors;
  }

  const [countries, setCountries] = React.useState([]);
  import("./country.json").then(val => {
    setCountries(val.default);
  });

  const [universities, setUniversities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  function getUnivListByCountry(country = "") {
    setUniversities([]);
    setIsLoading(true);
    let univDataFiltered = univData.filter(item => item.country === country);

    let univList = []
    for (let i in univDataFiltered) {
      univList.push(univDataFiltered[i].name)
    }
    setUniversities([...new Set(univList)].sort());
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (otherEduId)
      getUnivListByCountry(currentOtherEdu.country);
  }, [otherEduId])

  return (
    <Formik
      initialValues={currentOtherEdu || getBlankValues()}
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
        isSubmitting,
      }) => (
        <form id="positionForm">
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={5}>
                <Select
                  id="outlined-template"
                  name={FIELDS.country}
                  label="Negara"
                  error={errors[FIELDS.country] && touched[FIELDS.country]}
                  value={values[FIELDS.country]}
                  helperText={errors[FIELDS.country]}
                  onChange={handleChange}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  required
                  disabled={countries.length <= 0}
                  loading={countries.length <= 0}
                >
                  {countries.map(item => (
                    <Select.Item
                      key={item}
                      value={item}
                      selected={item === values[FIELDS.country]}
                      onClickCapture={() => {
                        getUnivListByCountry(item);
                        values[FIELDS.university] = "";
                      }}
                    >
                      {item}
                    </Select.Item>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={7}>
                {isLoading ? (
                  <LoadingFill />
                ) : (
                  <Select
                    id="outlined-template"
                    name={FIELDS.university}
                    label="Universitas"
                    error={
                      errors[FIELDS.university] && touched[FIELDS.university]
                    }
                    value={values[FIELDS.university]}
                    helperText={errors[FIELDS.university]}
                    onChange={handleChange}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    disabled={universities.length <= 0}
                    loading={universities.length <= 0}
                  >
                    {universities.map((item, i) => (
                      <Select.Item
                        key={i}
                        value={item}
                        selected={item === values[FIELDS.university]}
                      >
                        {item}
                      </Select.Item>
                    ))}
                  </Select>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name={FIELDS.program}
                  label="Program Studi"
                  error={errors[FIELDS.program] && touched[FIELDS.program]}
                  value={values[FIELDS.program]}
                  helperText={errors[FIELDS.program]}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="outlined-template"
                  name={FIELDS.degree}
                  label="Jenjang Pendidikan"
                  error={errors[FIELDS.degree] && touched[FIELDS.degree]}
                  value={values[FIELDS.degree]}
                  helperText={errors[FIELDS.degree]}
                  onChange={handleChange}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  required
                >
                  <Select.Item
                    value="S1"
                    selected={values[FIELDS.degree] === "S1"}
                  >
                    Sarjana
                  </Select.Item>
                  <Select.Item
                    value="S2"
                    selected={values[FIELDS.degree] === "S2"}
                  >
                    Magister
                  </Select.Item>
                  <Select.Item
                    value="S3"
                    selected={values[FIELDS.degree] === "S3"}
                  >
                    Doktor
                  </Select.Item>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={FIELDS.isGraduated}
                      checked={values[FIELDS.isGraduated]}
                      value={FIELDS.isGraduated}
                      onChange={handleChange}
                    />
                  }
                  label="Sudah lulus"
                />
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDatePicker
                    name={FIELDS.classYear}
                    label="Tahun Masuk"
                    format="YYYY"
                    error={
                      errors[FIELDS.classYear] && touched[FIELDS.classYear]
                    }
                    value={values[FIELDS.classYear].toString()}
                    helperText={errors[FIELDS.classYear]}
                    onChange={date => setFieldValue(FIELDS.classYear, date)}
                    margin="dense"
                    variant="outlined"
                    views={["year"]}
                    clearable
                    fullWidth
                    required
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDatePicker
                    name={FIELDS.graduationYear}
                    label="Tahun Lulus"
                    format="YYYY"
                    error={
                      errors[FIELDS.graduationYear] &&
                      touched[FIELDS.graduationYear]
                    }
                    value={
                      values[FIELDS.graduationYear] === null
                        ? values[FIELDS.graduationYear]
                        : values[FIELDS.graduationYear].toString()
                    }
                    helperText={errors[FIELDS.graduationYear]}
                    onChange={date =>
                      setFieldValue(FIELDS.graduationYear, date)
                    }
                    disabled={!values[FIELDS.isGraduated]}
                    margin="dense"
                    variant="outlined"
                    views={["year"]}
                    clearable
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {update && (
              <IconButton
                style={{ color: "#E24C4C" }}
                onClick={() => {
                  window.alertDialog(
                    "Menghapus edukasi",
                    "Apakah anda yakin ingin menghapus edukasi?",
                    function() {
                      deleteOtherEdu(otherEduId).then(afterSubmit);
                    },
                    () => {}
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
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
        </form>
      )}
    </Formik>
  );
}

function createContainer() {
  const mapStateToProps = (state, { otherEduId }) => ({
    currentOtherEdu: getOtherEduById(state, otherEduId),
  });

  const mapDispatchToProps = dispatch => ({
    createOtherEdu: payload => dispatch(createOtherEdus(payload)),
    updateOtherEdu: (otherEduId, payload) =>
      dispatch(updateOtherEduById(otherEduId, payload)),
    deleteOtherEdu: otherEduId => dispatch(deleteOtherEduById(otherEduId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(OtherEduForm);
}

export default createContainer();
