import React from "react";

import { makeStyles, withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Guidelines } from "../../../styles";
import { Grid, DialogContentText } from "@material-ui/core";
import FormDialog from "../../../components/FormDialog";
import EditProfileForm from "./EditProfileForm";
import Education from "../../../components/stables/Experience/Education";
import WorkPosition from "../../../components/stables/Experience/WorkPosition";

const useStyles = makeStyles({
  head: {
    ...Guidelines.layouts.w100,
    display: "flex",
    justifyContent: "space-between"
  },
  titleChild: {
    ...Guidelines.layouts.mb32,
    ...Guidelines.fonts.bold,
    fontSize: 28
  },
  gridField: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    ...Guidelines.fonts.bold,
    fontSize: 16
  },
  value: {
    fontSize: 16
  }
});

function Head(props) {
  const classes = useStyles();
  return (
    <div className={classes.head}>
      <Typography className={classes.titleChild} variant="h5" component="h3">
        {props.children}
      </Typography>
      {props.onClick && (
        <IconButton onClick={props.onClick}>{<props.Icon />}</IconButton>
      )}
    </div>
  );
}

function Field(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={32} className={classes.gridField}>
        <Grid item xs={3} sm={3}>
          <Typography className={classes.label} component="p">
            {props.label}
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <Typography className={classes.value} component="p">
            {props.value}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  paperChild: {
    ...Guidelines.layouts.mt24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    fontSize: 20
  },
  gridBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...Guidelines.layouts.mr24
  },
  btn: {
    ...Guidelines.layouts.mt32,
  }
});

class ProfilePage extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderBody() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h5" component="h3">
          Info Pribadi
        </Typography>
        <Typography className={classes.subtitle} component="p">
          Info pribadi yang Anda gunakan di layanan ILUNI12 Channel
        </Typography>

        <Paper className={classes.paperChild} elevation={1}>
          <Head onClick={this.handleClickOpen} Icon={EditIcon}>
            Profil
          </Head>
          <Field label="Nama" value="Wisnu Ramadhan" />
          <Field label="Tanggal Lahir" value="1998/06/13" />
          <Field label="Email" value="wisnu@ui.ac.id" />
          <Field label="Nomor Telepon" value="081212345677" />
          <Field label="Lokasi" value="Depok, Indonesia" />
          <Field label="Website" value="www.scele.ui.ac.id" />
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Head onClick={this.handleClickOpen} Icon={EditIcon}>
            Kata Sandi
          </Head>
          <Field label="Kata Sandi" value="*******" />
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Head>Pendidikan</Head>
          <Education/>
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Head Icon={AddBoxIcon} onClick={() => null}>
            Posisi Pekerjaan
          </Head>
          <WorkPosition/>
        </Paper>
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FormDialog
          title="Ubah Profil"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogContent>
            <DialogContentText>
              <EditProfileForm />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid item xs={12} sm={12} className={classes.gridBtn}>
              <Button
                onClick={this.handleClose}
                className={classes.btn}
                color="secondary"
              >
                Batal
              </Button>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                Simpan
              </Button>
            </Grid>
          </DialogActions>
        </FormDialog>
        {this.renderBody()}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(ProfilePage);
