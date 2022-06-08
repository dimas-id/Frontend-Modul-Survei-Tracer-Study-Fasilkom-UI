import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});


class FetchForm extends React.PureComponent {
  render() {
    const { classes, semester, tahun, handleChange, handleFetch } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.item} xs={12} sm={4}>
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              name="semester"
              labelid="semester-label"
              value={semester}
              onChange={handleChange}
              variant="outlined"
              input={<OutlinedInput />}
            >
              <MenuItem value="" selected={semester === ""} />
              <MenuItem value={"1"} selected={semester === "1"}>
                Ganjil
              </MenuItem>
              <MenuItem value={"2"} selected={semester === "2"}>
                Genap
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item className={classes.item} xs={12} sm={4}>
          <TextField
            fullWidth
            disabled={semester === ""}
            id="tahun"
            label="Tahun (YYYY)"
            margin="normal"
            variant="outlined"
            inputProps={{ minLength: 4, maxLength: 4, pattern: "[0-9]" }}
            required={semester !== ""}
            error={
              (tahun === "" && semester !== "") ||
              (tahun !== "" && tahun.length < 4)
            }
            helperText={
              (tahun === "" && semester !== "" ? "Required" : "") ||
              (tahun !== "" && tahun.length < 4
                ? "Masukkan tahun lulus dengan format YYYY"
                : "")
            }
            value={tahun}
            onChange={handleChange}
          />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFetch}
            disabled={
              semester === "" ||
              (semester !== "" && (tahun === "" || tahun.length < 4))
            }
          >
            Ambil Data Mahasiswa
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

FetchForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
const MapStateToProps = state => ({});

export default connect(MapStateToProps)(withStyles(styles)(FetchForm));
