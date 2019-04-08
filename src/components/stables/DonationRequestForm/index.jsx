import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Guidelines } from "../../../styles";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileUploadInput from "../../components/stables/FileUploadInput";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";


const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 48
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold
  },
  textField: {},
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Pengaju Program Donasi
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            disabled
            id="oulined-dissabled"
            defaultValue={user.name}
            className={classes.textField}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Kategori Donasi *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-select-category"
            select
            className={classes.textField}
            name={FIELDS.categoryName}
            value={values[FIELDS.categoryName]}
            onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Pilih Kategori Donasi"
            margin="normal"
            variant="outlined"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Judul Donasi *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            required
            id="outlined-text-input"
            className={classes.textField}
            placeholder="Judul donasi yang diajukan"
            name={FIELDS.title}
            value={values[FIELDS.title]}
            onChange={this.handleChange}
            autoComplete="judul"
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Deskripsi *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            required
            id="outlined-text-input"
            className={classes.textField}
            placeholder="Deskripsi program donasi"
            name={FIELDS.description}
            value={values[FIELDS.description]}
            onChange={this.handleChange}
            autoComplete="judul"
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Tanggal mulai *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <InlineDatePicker
              className={classes.field}
              clearable
              variant="outlined"
              margin="normal"
              format="YYYY-MM-DD"
              name={FIELDS.startDate}
              value={values[FIELDS.startDate]}
              onChange={this.handleDateChange(FIELDS.startDate)}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Tanggal selesai *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <InlineDatePicker
              className={classes.field}
              clearable
              variant="outlined"
              margin="normal"
              format="YYYY-MM-DD"
              name={FIELDS.endDate}
              value={values[FIELDS.endDate]}
              onChange={this.handleDateChange(FIELDS.endDate)}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Target Donasi *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            required
            id="outlined-required"
            label="Jumlah Donasi"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name={FIELDS.goalAmount}
            value={values[FIELDS.goalAmount]}
            onChange={this.handleChange}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Unggah Proposal *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <FileUploadInput
            accept="application/pdf"
            name={FIELDS.proposalUrl}
            value={values[FIELDS.proposalUrl]}
            onChange={this.handleFileSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.gridBtn}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleSubmit}
            component={Link}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});
