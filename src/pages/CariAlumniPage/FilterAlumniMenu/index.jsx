import React, { useState } from "react";
import PropTypes from "prop-types";
import PROGRAMS from "../../../libs/studyProgram";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getUser } from "../../../modules/session/selectors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function SelectGender(props) {
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      {/* <InputLabel shrink id="gender-label">
        Jenis Kelamin
      </InputLabel> */}
      <TextField
        select
        name="gender"
        labelid="gender-label"
        label="Jenis Kelamin"
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value="" selected={props.value === ""} />
        <MenuItem value={"M"} selected={props.value === "M"}>
          Laki-Laki
        </MenuItem>
        <MenuItem value={"F"} selected={props.value === "F"}>
          Perempuan
        </MenuItem>
      </TextField>
    </FormControl>
  );
}

function SelectProgram(props) {
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      {/* <InputLabel id="gelar-label">Gelar dan Program Studi</InputLabel> */}
      <TextField
        select
        name="gelar"
        labelid="gelar-label"
        label="Gelar dan Program Studi"
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value="" selected={props.value === ""} />
        {PROGRAMS.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
            selected={props.value === item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

function SelectIndustri(props) {
  const [industries, setIndustries] = useState([]);
  import(
    "../../../components/stables/Experience/PositionForm/industry.json"
  ).then(val => {
    setIndustries(val.default);
  });

  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      {/* <InputLabel id="industri-label">Industri Pekerjaan</InputLabel> */}
      <TextField
        select
        name="industri"
        labelid="industri-label"
        label="Industri Pekerjaan"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value="" selected={props.value === ""} />
        {industries.map(item => (
          <MenuItem key={item} value={item} selected={props.value === item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

function TahunLulus(props) {
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <InputLabel>Periode Lulus (dari)</InputLabel>
        <Grid container justify="space-between">
          <Grid item xs>
            <FormControl variant="outlined" margin="normal" fullWidth>
              {/* <InputLabel id="from-semester-label">Semester</InputLabel> */}
              <TextField
                select
                name="from-semester"
                labelid="from-semester-label"
                label="Semester"
                value={props.fromSemester}
                onChange={props.onChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="" selected={props.fromSemester === ""} />
                <MenuItem value={"2"} selected={props.fromSemester === "2"}>
                  Ganjil
                </MenuItem>
                <MenuItem value={"1"} selected={props.fromSemester === "1"}>
                  Genap
                </MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              disabled={props.fromSemester === ""}
              id="from-tahun"
              label="Tahun (YYYY)"
              margin="normal"
              variant="outlined"
              inputProps={{ minLength: 4, maxLength: 4, pattern: "[0-9]" }}
              InputLabelProps={{ shrink: true }}
              placeholder="Contoh: 2021"
              required={props.fromSemester !== ""}
              error={
                (props.fromTahun === "" && props.fromSemester !== "") ||
                (props.fromTahun !== "" && props.fromTahun.length < 4)
              }
              helperText={
                (props.fromTahun === "" && props.fromSemester !== ""
                  ? "Required"
                  : "") ||
                (props.fromTahun !== "" && props.fromTahun.length < 4
                  ? "Masukkan tahun lulus dengan format YYYY"
                  : "")
              }
              value={props.fromTahun}
              onChange={props.onChange}
            />
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: "10px" }}>
        <InputLabel>Periode Lulus (sampai)</InputLabel>
        <Grid container justify="space-between">
          <Grid item xs>
            <FormControl
              variant="outlined"
              margin="normal"
              fullWidth
              required={props.fromSemester !== ""}
              error={props.toSemester === "" && props.fromSemester !== ""}
            >
              {/* <InputLabel id="to-semester-label">Semester</InputLabel> */}
              <TextField
                select
                disabled={props.fromSemester === ""}
                name="to-semester"
                labelid="to-semester-label"
                label="Semester"
                helperText={
                  props.toSemester === "" && props.fromSemester !== ""
                    ? "Required"
                    : ""
                }
                value={props.toSemester}
                onChange={props.onChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="" selected={props.toSemester === ""} />
                <MenuItem value={"2"} selected={props.toSemester === "2"}>
                  Ganjil
                </MenuItem>
                <MenuItem value={"1"} selected={props.toSemester === "1"}>
                  Genap
                </MenuItem>
              </TextField>
              {props.toSemester === "" && props.fromSemester !== "" ? (
                <FormHelperText>Required</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              disabled={props.fromSemester === ""}
              id="to-tahun"
              label="Tahun (YYYY)"
              margin="normal"
              variant="outlined"
              inputProps={{ minLength: 4, maxLength: 4, pattern: "[0-9]" }}
              InputLabelProps={{ shrink: true }}
              placeholder="Contoh: 2022"
              required={props.fromSemester !== ""}
              error={
                (props.toTahun === "" && props.fromSemester !== "") ||
                (props.toTahun !== "" && props.toTahun.length < 4)
              }
              helperText={
                (props.toTahun === "" && props.fromSemester !== ""
                  ? "Required"
                  : "") ||
                (props.toTahun !== "" && props.toTahun.length < 4
                  ? "Masukkan tahun lulus dengan format YYYY"
                  : "")
              }
              value={props.toTahun}
              onChange={props.onChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

class FilterAlumniMenu extends React.PureComponent {
  render() {
    const {
      classes,
      user,
      nama,
      gender,
      lokasi,
      angkatan,
      fromSemester,
      fromTahun,
      toSemester,
      toTahun,
      gelar,
      posisi,
      industri,
      perusahaan,
      handleChange,
      handleSearch,
      handleReset,
    } = this.props;

    return (
      <Paper
        className={classes.root}
        elevation={1}
        style={{ maxHeight: "70vh", overflowY: "scroll" }}
      >
        <TextField
          autoFocus
          fullWidth
          id="nama"
          label="Nama Alumni"
          margin="normal"
          variant="outlined"
          value={nama}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          placeholder="Contoh: Annisya"
        />
        {(user.isStaff || user.isSuperUser) && (
          <div>
            <SelectGender value={gender} onChange={handleChange} />
            <TextField
              fullWidth
              id="lokasi"
              label="Lokasi"
              margin="normal"
              variant="outlined"
              value={lokasi}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              placeholder="Contoh: Jakarta"
            />
          </div>
        )}
        <TextField
          fullWidth
          id="angkatan"
          label="Angkatan (YYYY)"
          margin="normal"
          variant="outlined"
          inputProps={{ minLength: 4, maxLength: 4, pattern: "[0-9]" }}
          InputLabelProps={{ shrink: true }}
          placeholder="Contoh: 2018"
          error={angkatan !== "" && angkatan.length < 4}
          helperText={
            angkatan !== "" && angkatan.length < 4
              ? "Masukkan tahun angkatan dengan format YYYY"
              : ""
          }
          value={angkatan}
          onChange={handleChange}
        />
        {(user.isStaff || user.isSuperUser) && (
          <TahunLulus
            fromSemester={fromSemester}
            fromTahun={fromTahun}
            toSemester={toSemester}
            toTahun={toTahun}
            onChange={handleChange}
          />
        )}
        <SelectProgram value={gelar} onChange={handleChange} />
        <TextField
          fullWidth
          id="posisi"
          label="Posisi Saat Ini"
          margin="normal"
          variant="outlined"
          value={posisi}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          placeholder="Contoh: Product Manager"
        />
        <SelectIndustri value={industri} onChange={handleChange} />
        <TextField
          fullWidth
          id="perusahaan"
          label="Nama Perusahaan"
          margin="normal"
          variant="outlined"
          value={perusahaan}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          placeholder="Contoh: Tokopedia"
        />

        <br />
        <br />
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={
                fromSemester !== "" &&
                (fromTahun === "" ||
                  toSemester === "" ||
                  toTahun === "" ||
                  fromTahun.length < 4 ||
                  toTahun.length < 4)
              }
            >
              Cari
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              color="info"
              fullWidth
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

FilterAlumniMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
const MapStateToProps = state => ({
  user: getUser(state),
});

export default connect(MapStateToProps)(withStyles(styles)(FilterAlumniMenu));
