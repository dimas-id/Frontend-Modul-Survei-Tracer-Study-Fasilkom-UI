import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Guidelines } from "../../../styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FormDialog from "../../../components/FormDialog";


const styles = theme => ({
  avatar: {
    width: 120,
    height: 120
  },

  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  gridInfo: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddle
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    fontSize: 20
  },
  paperChild: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24
  },
  titleChild: {
    ...Guidelines.fonts.bold,
    fontSize: 28
  },
  subtitleChild: {
    ...Guidelines.layouts.mt16,
    fontSize: 16
  },
  button: {
    display: "flex",
    alignItems: "center"
  }
});
class HomePage extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render (){
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FormDialog title="Info Verifikasi" open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Batal
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Verifikasi Sekarang
            </Button>
          </DialogActions>
        </FormDialog>
        <Paper className={classes.paper} elevation={1}>
          <AccountCircleIcon className={classes.avatar} fontSize="large" />
          <Typography className={classes.title} variant="h5" component="h3">
            Selamat datang, Wisnu Ramadhan
          </Typography>
          <div className={classes.gridInfo}>
            <Typography className={classes.subtitle} component="p">
              Akun Anda belum terverifikasi
            </Typography>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleClickOpen}
            >
              Info selengkapnya
            </Button>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paperChild} elevation={1}>
                <Typography
                  className={classes.titleChild}
                  variant="h5"
                  component="h3"
                >
                  Donasi
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={6} sm={6}>
                    <Typography className={classes.subtitleChild} component="p">
                      Sarana untuk menyalurkan salah satu bentuk kepedulian sosial
                      Anda
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    gambar awan
                  </Grid>
                  <Button color="primary" className={classes.button}>
                    Lihat Donasi >
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paperChild} elevation={1}>
                <Typography
                  className={classes.titleChild}
                  variant="h5"
                  component="h3"
                >
                  Channel
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={6} sm={6}>
                    <Typography className={classes.subtitleChild} component="p">
                      Sarana bertukar informasi antar pengguna yang disajikan
                      dengan berbagai kategori
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    gambar awan
                  </Grid>
                  <Button color="primary" className={classes.button}>
                    Lihat Channel >
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(HomePage)
