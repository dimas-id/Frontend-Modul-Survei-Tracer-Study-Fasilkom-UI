import React from "react";
import { connect } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Guidelines } from "../../../styles";

import FormDialog from "../../../components/FormDialog";
import EditProfileForm from "./EditProfileForm";
import WorkPosition from "../../../components/stables/Experience/WorkPosition";
import Education from "../../../components/stables/Experience/Education";
import PositionForm from "../../../components/stables/Experience/PositionForm";
import OtherEdu from "../../../components/stables/Experience/OtherEdu";
import OtherEduForm from "../../../components/stables/Experience/OtherEduForm";

import { getUser } from "../../../modules/session/selectors";
import { getDateFormatted } from "../../../libs/datetime";

const useStyles = makeStyles({
  head: {
    ...Guidelines.layouts.w100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleChild: {
    ...Guidelines.layouts.mb32,
    ...Guidelines.fonts.bold,
    fontSize: 28,
  },
  gridField: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    ...Guidelines.fonts.bold,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
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
          <Typography className={classes.value} component="p" noWrap>
            {props.value || "-"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mb24,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb32,
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.pr32,
      ...Guidelines.layouts.pl32,
      ...Guidelines.layouts.mb48,
    },
  },
});

class ProfilePage extends React.Component {
  state = {
    openProfile: false,
    openPosition: false,
    positionId: null,
    isNewPosition: false,
    openOtherEdu: false,
    otherEduId: null,
    isNewOtherEdu: false,
  };

  closePosition = () =>
    this.setState({
      openPosition: false,
      positionId: null,
      isNewPosition: false,
    });

  handleOpenProfile = () => {
    this.setState({ openProfile: true });
  };

  handleCloseProfile = () => {
    this.setState({ openProfile: false });
  };

  handleOpenPositionNew = () =>
    this.setState({
      openPosition: true,
      positionId: null,
      isNewPosition: true,
    });

  handleOpenPositionUpdate = positionId =>
    this.setState({
      positionId,
      openPosition: true,
      isNewPosition: false,
    });

  handleClosePosition = () => {
    if (this.state.isNewPosition) {
      window.alertDialog(
        "Apakah anda yakin?",
        "Jika anda tutup, maka pernyataan anda akan hilang.",
        this.closePosition,
        () => null
      );
    } else {
      this.closePosition();
    }
  };

  handleAfterSubmit = res => {
    if (!res.error) {
      this.closePosition();
    }
  };

  renderPositionForm() {
    const { openPosition, positionId, isNewPosition } = this.state;
    const title = isNewPosition ? "Tambah Posisi" : "Ubah Posisi";
    return (
      <FormDialog
        title={title}
        open={openPosition}
        onClose={this.handleClosePosition}
      >
        <PositionForm
          update={!isNewPosition}
          positionId={positionId}
          afterSubmit={this.handleAfterSubmit}
        />
      </FormDialog>
    );
  }

  closeOtherEdu = () =>
    this.setState({
      openOtherEdu: false,
      otherEduId: null,
      isNewOtherEdu: false,
    });

  handleOpenOtherEduNew = () =>
    this.setState({
      openOtherEdu: true,
      otherEduId: null,
      isNewOtherEdu: true,
    });

  handleOpenOtherEduUpdate = otherEduId =>
    this.setState({
      otherEduId,
      openOtherEdu: true,
      isNewOtherEdu: false,
    });

  handleCloseOtherEdu = () => {
    if (this.state.isNewOtherEdu) {
      window.alertDialog(
        "Apakah anda yakin?",
        "Jika anda tutup, maka pernyataan anda akan hilang.",
        this.closeOtherEdu,
        () => null
      );
    } else {
      this.closeOtherEdu();
    }
  };

  handleAfterSubmitOtherEdu = res => {
    if (!res.error) {
      this.closeOtherEdu();
    }
  };

  renderOtherEduForm() {
    const { openOtherEdu, otherEduId, isNewOtherEdu } = this.state;
    const title = isNewOtherEdu ? "Tambah Pendidikan" : "Ubah Pendidikan";
    return (
      <FormDialog
        title={title}
        open={openOtherEdu}
        onClose={this.handleCloseOtherEdu}
      >
        <OtherEduForm
          update={!isNewOtherEdu}
          otherEduId={otherEduId}
          afterSubmit={this.handleAfterSubmitOtherEdu}
        />
      </FormDialog>
    );
  }

  renderBody() {
    const { classes, user } = this.props;
    let location = user.profile.residenceCity || "";
    location = location
      ? `${location}, ${user.profile.residenceCountry}`
      : user.profile.residenceCountry;

    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.title} variant="h5" component="h3">
            Info Pribadi
          </Typography>
          <Typography className={classes.subtitle} component="p">
            Info pribadi yang Anda gunakan di layanan ILUNI12 Channel
          </Typography>
          <Head onClick={this.handleOpenProfile} Icon={EditIcon}>
            Profil
          </Head>
          <Field label="Nama" value={user.name} />
          <Field
            label="Tanggal Lahir"
            value={getDateFormatted(user.profile.birthdate, "DD MMMM YYYY")}
          />
          <Field label="Email" value={user.email} />
          <Field label="Nomor Telepon" value={user.profile.phoneNumber} />
          <Field label="Lokasi" value={location} />
          <Field label="Profil LinkedIn" value={user.profile.linkedinUrl} />
        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <Head>Kata Sandi</Head>
          <Field label="Kata Sandi" value="*******" />
        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <Head>
            Riwayat Pendidikan Fasilkom UI
          </Head>
          <Education />
        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <Head Icon={AddBoxIcon} onClick={this.handleOpenOtherEduNew}>
            Riwayat Pendidikan di Luar Fasilkom UI
          </Head>
          <OtherEdu
            onEdit={this.handleOpenOtherEduUpdate}
            onAdd={this.handleOpenOtherEduNew}
          />
        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <Head Icon={AddBoxIcon} onClick={this.handleOpenPositionNew}>
            Posisi Pekerjaan
          </Head>
          <WorkPosition
            onEdit={this.handleOpenPositionUpdate}
            onAdd={this.handleOpenPositionNew}
          />
        </Paper>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <FormDialog
          title="Ubah Profil"
          open={this.state.openProfile}
          onClose={this.handleCloseProfile}
        >
          <EditProfileForm onSuccess={this.handleCloseProfile} />
        </FormDialog>
        {this.renderOtherEduForm()}
        {this.renderPositionForm()}
        {this.renderBody()}
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
  });

  return connect(mapStateToProps)(withStyles(styles)(ProfilePage));
}

export default createContainer();
