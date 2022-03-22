import React, { useState } from "react";
import PropTypes from "prop-types";
import PROGRAMS from "../../../libs/studyProgram";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

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
      <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
      <Select
        name="gender"
        labelid="gender-label"
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        input={<OutlinedInput />}
      >
        <MenuItem value="" selected={props.value === ""} />
        <MenuItem value={"M"} selected={props.value === "L"}>
          Laki-Laki
        </MenuItem>
        <MenuItem value={"F"} selected={props.value === "P"}>
          Perempuan
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function SelectAngkatan(props) {
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <InlineDatePicker
      id="angkatan"
      label={`Angkatan`}
      value={props.value}
      onChange={props.onChange}
      margin="normal"
      variant="outlined"
      format="YYYY"
      views={["year"]}
      clearable
    />
  </MuiPickersUtilsProvider>;
}

function SelectProgram(props) {
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <InputLabel id="gelar-label">Gelar dan Program Studi</InputLabel>
      <Select
        name="gelar"
        labelid="gelar-label"
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        input={<OutlinedInput />}
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
      </Select>
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
      <InputLabel id="industri-label">Industri Pekerjaan</InputLabel>
      <Select
        name="industri"
        labelid="industri-label"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        input={<OutlinedInput />}
      >
        <MenuItem value="" selected={props.value === ""} />
        {industries.map(item => (
          <MenuItem
            key={item}
            value={item}
            selected={props.value === item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

class FilterAlumniMenu extends React.PureComponent {
  render() {
    const {
      classes,
      nama,
      gender,
      domisili,
      angkatan,
      gelar,
      posisi,
      industri,
      perusahaan,
      handleChange,
      handleSearch,
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
          label="Nama Lengkap Alumni"
          margin="normal"
          variant="outlined"
          value={nama}
          onChange={handleChange}
        />
        <SelectGender //TODO: bikin keliatan cuma buat admin
          value={gender}
          onChange={handleChange}
        />
        <TextField //TODO: bikin keliatan cuma buat admin
          fullWidth
          id="domisili"
          label="Domisili"
          margin="normal"
          variant="outlined"
          value={domisili}
          onChange={handleChange}
        />
        {/* <SelectAngkatan //FIXME: target ga kebaca jadi error di handleChange
          value={angkatan}
          onChange={handleChange}
        /> */}
        <TextField
          fullWidth
          id="angkatan"
          label="Angkatan (YYYY)"
          margin="normal"
          variant="outlined"
          inputProps={{ minLength: 4, maxLength: 4, pattern: "[0-9]" }}
          error={angkatan !== "" && angkatan.length < 4}
          helperText={
            angkatan !== "" && angkatan.length < 4
              ? "Masukkan tahun angkatan dengan format YYYY"
              : ""
          }
          value={angkatan}
          onChange={handleChange}
        />
        <SelectProgram value={gelar} onChange={handleChange} />
        <TextField
          fullWidth
          id="posisi"
          label="Posisi Saat Ini"
          margin="normal"
          variant="outlined"
          value={posisi}
          onChange={handleChange}
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
        />

        <br />
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "50%" }}
            onClick={handleSearch}
          >
            Cari
          </Button>
        </center>
      </Paper>
    );
  }
}

FilterAlumniMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterAlumniMenu);
