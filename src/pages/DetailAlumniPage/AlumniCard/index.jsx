import React from "react";
import PropTypes from "prop-types";
import { getUser } from "../../../modules/session/selectors";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { Guidelines } from "../../../styles";
import { makeStyles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getDateFormatted } from "../../../libs/datetime";
import { MAP_PROGRAM_CODE } from "../../../libs/studyProgram";


const styles = theme => ({
  container: {
    ...Guidelines.layouts.pt16,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb16,
  },
});

const useStyles = makeStyles({
  container: {
    ...Guidelines.layouts.pt16,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb16,
  },
  head: {
    ...Guidelines.layouts.w100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleChild: {
    ...Guidelines.layouts.mb24,
    ...Guidelines.fonts.bold,
    fontSize: 26,
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
  profilePic: {
    borderRadius: "50%",
    maxWidth: "50%",
    margin: "5px 25px 5px 5px",
  },
});

function Head(props) {
  const classes = useStyles();
  return (
    <div className={classes.head}>
      <Typography className={classes.titleChild} variant="h5" component="h3">
        {props.children}
      </Typography>
    </div>
  );
}

function Label(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridField}>
      <Grid item>
        <Typography className={classes.label} component="p">
          {props.label}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Value(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridField}>
      <Grid item>
        <Typography
          className={classes.value}
          component="p"
          style={{ paddingBottom: props.pb }}
        >
          {props.value || "-"}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Field(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridField}>
      <Grid item>
        <Label label={props.label} />
        <Value value={props.value || "-"} pb="12px" />
      </Grid>
    </Grid>
  );
}

function DataDiri(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs>
          <center>
            <img
              src={props.foto}
              className={classes.profilePic}
              alt="profile pic of somebody"
            />
          </center>
        </Grid>
        <Grid item xs>
          <Field label="Nama Lengkap" value={props.nama} />
          {(props.user.isStaff || props.user.isSuperUser) && (
            <Field label="Jenis Kelamin" value={props.gender} />
          )}
          <Field label="Profil LinkedIn" value={props.linkedin} />
        </Grid>
        <Grid item xs>
          {(props.user.isStaff || props.user.isSuperUser) && (
            <>
              <Field
                label="Tanggal Lahir"
                value={getDateFormatted(props.lahir, "DD MMMM YYYY")}
              />
              <Field label="Domisili" value={props.domisili} />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function RiwayatFasilkom(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Head>Riwayat Pendidikan Fasilkom UI</Head>
        {props.data.length > 0 ? (
          <>
            {props.user.isStaff || props.user.isSuperUser ? (
              <>
                <Grid item xs={3}>
                  <Label label="NPM" />
                </Grid>
                <Grid item xs={3}>
                  <Label label="Angkatan" />
                </Grid>
                <Grid item xs={3}>
                  <Label label="Tahun Lulus" />
                </Grid>
                <Grid item xs={3}>
                  <Label label="Gelar dan Program Studi" />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={4}>
                  <Label label="Angkatan" />
                </Grid>
                <Grid item xs={4}>
                  <Label label="Tahun Lulus" />
                </Grid>
                <Grid item xs={4}>
                  <Label label="Gelar dan Program Studi" />
                </Grid>
              </>
            )}

            {props.data.map((item, i) => (
              <>
                {props.user.isStaff || props.user.isSuperUser ? (
                  <>
                    <Grid item xs={3}>
                      <Value value={item.uiSsoNpm} />
                    </Grid>
                    <Grid item xs={3}>
                      <Value value={item.csuiClassYear} />
                    </Grid>
                    <Grid item xs={3}>
                      {/* TODO: ganti csuiGradYear sesuai dari BE */}
                      <Value value={item.csuiGradYear} />
                    </Grid>
                    <Grid item xs={3}>
                      <Value value={MAP_PROGRAM_CODE[item.csuiProgram]} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={4}>
                      <Value value={item.csuiClassYear} />
                    </Grid>
                    <Grid item xs={4}>
                      {/* TODO: ganti csuiGradYear sesuai dari BE */}
                      <Value value={item.csuiGradYear} />
                    </Grid>
                    <Grid item xs={4}>
                      <Value value={MAP_PROGRAM_CODE[item.csuiProgram]} />
                    </Grid>
                  </>
                )}
              </>
            ))}
          </>
        ) : (
          <Value value="-" />
        )}
      </Grid>
    </div>
  );
}

function RiwayatKerja(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Head>Riwayat Pekerjaan</Head>
        {props.data.length > 0 ? (
          <>
            {props.data.map((item, i) => (
              <>
                <Grid item xs={4}>
                  <Value
                    value={`${getDateFormatted(
                      item.dateStarted,
                      "MMM YYYY"
                    )} - ${
                      item.dateEnded
                        ? getDateFormatted(item.dateEnded, "MMM YYYY")
                        : "Sekarang"
                    }`}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field label={item.title} value={item.companyName} />
                </Grid>
              </>
            ))}
          </>
        ) : (
          <Value value="-" />
        )}
      </Grid>
    </div>
  );
}

class AlumniCard extends React.PureComponent {
  render() {
    const {
      classes,
      alumni,
      user,
    } = this.props;

    return (
      <Paper
        className={classes.container}
        elevation={1}
        style={{
          maxWidth: "120vh",
          height: "80vh",
          overflowY: "scroll",
        }}
      >
        <DataDiri
          user={user}
          foto={alumni.profile.profilePicUrl}
          nama={alumni.name}
          lahir={alumni.profile.birthdate}
          gender={alumni.profile.gender}
          domisili={alumni.profile.residenceCity}
          linkedin={alumni.profile.linkedinUrl}
        />
        <Divider variant="middle" />
        <RiwayatFasilkom
          user={user}
          data={alumni.educations}
        />
        <Divider variant="middle" />
        <RiwayatKerja data={alumni.positions} />
      </Paper>
    );
  }
}

AlumniCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const MapStateToProps = state => ({
  user: getUser(state),
});

export default connect(MapStateToProps)(withStyles(styles)(AlumniCard));
