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
import Chip from "@material-ui/core/Chip";
import skillDict from "../../../components/stables/Experience/Skill/skill.json";
import atlasV1 from "../../../modules/api/atlas/v1";
import { LoadingFill } from "../../../components/Loading";

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
  chip: {
    margin: "2px",
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
              <Field label="Lokasi" value={props.lokasi} />
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
                <Grid item xs={4}>
                  <Label label="NPM" />
                </Grid>
                <Grid item xs={4}>
                  <Label label="Gelar dan Program Studi" />
                </Grid>
                <Grid item xs={2}>
                  <Label label="Angkatan" />
                </Grid>
                <Grid item xs={2}>
                  <Label label="Tahun Lulus" />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={4}>
                  <Label label="Angkatan" />
                </Grid>
                <Grid item xs={4}>
                  <Label label="Gelar dan Program Studi" />
                </Grid>
                <Grid item xs={4}>
                  <Label label="Tahun Lulus" />
                </Grid>
              </>
            )}

            {props.data.map((item, i) => (
              <>
                {props.user.isStaff || props.user.isSuperUser ? (
                  <>
                    <Grid item xs={4}>
                      <Value value={item.uiSsoNpm} />
                    </Grid>
                    <Grid item xs={4}>
                      <Value value={MAP_PROGRAM_CODE[item.csuiProgram]} />
                    </Grid>
                    <Grid item xs={2}>
                      <Value value={item.csuiClassYear} />
                    </Grid>
                    <Grid item xs={2}>
                      <Value
                        value={
                          item.csuiGraduationTerm && item.csuiGraduationYear
                            ? (i ? ", " : "") +
                              (item.csuiGraduationTerm === 1
                                ? "Genap " + (item.csuiGraduationYear + 1)
                                : "Ganjil " + item.csuiGraduationYear)
                            : ""
                        }
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={4}>
                      <Value value={item.csuiClassYear} />
                    </Grid>
                    <Grid item xs={4}>
                      <Value value={MAP_PROGRAM_CODE[item.csuiProgram]} />
                    </Grid>
                    <Grid item xs={4}>
                      <Value
                        value={
                          item.csuiGraduationTerm && item.csuiGraduationYear
                            ? (i ? ", " : "") +
                              (item.csuiGraduationTerm === 1
                                ? "Genap " + (item.csuiGraduationYear + 1)
                                : "Ganjil " + item.csuiGraduationYear)
                            : ""
                        }
                      />
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

function RiwayatPendLain(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Head>Riwayat Pendidikan di Luar Fasilkom UI</Head>
        {props.data.length > 0 ? (
          <>
            <Grid item xs={4}>
              <Label label="Universitas" />
            </Grid>
            <Grid item xs={4}>
              <Label label="Gelar dan Program Studi" />
            </Grid>
            <Grid item xs={2}>
              <Label label="Tahun Masuk" />
            </Grid>
            <Grid item xs={2}>
              <Label label="Tahun Lulus" />
            </Grid>
            {props.data.map((item, i) => (
              <>
                <Grid item xs={4}>
                  <Value value={item.university} />
                </Grid>
                <Grid item xs={4}>
                  <Value value={item.degree + " - " + item.program} />
                </Grid>
                <Grid item xs={2}>
                  <Value value={item.classYear} />
                </Grid>
                <Grid item xs={2}>
                  <Value value={item.isGraduated ? item.graduationYear : ""} />
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
                  <Field
                    label={item.title}
                    value={item.companyName + " - " + item.industryName}
                  />
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

function Skills(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Head>Skill</Head>
        {props.data.length > 0 ? (
          props.data.map(skill => (
            <Chip className={classes.chip} label={skillDict[skill]} />
          ))
        ) : (
          <Value value="-" />
        )}
      </Grid>
    </div>
  );
}

class AlumniCard extends React.PureComponent {
  state = {
    skillLoading: true,
    userSkills: [],
  };

  getSkillList = () => {
    atlasV1.session
      .getSkills(this.props.user.id)
      .then(result => {
        let skills = result.data.topSkills;
        this.setState({
          userSkills: Object.keys(skills).filter(key => skills[key] === true),
        });
      })
      .finally(() => this.setState({ skillLoading: false }));
  };

  componentDidMount() {
    this.getSkillList();
  }

  render() {
    const { classes, alumni, user } = this.props;

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
          lokasi={alumni.profile.residenceCountry}
          linkedin={alumni.profile.linkedinUrl}
        />
        <Divider variant="middle" />
        <RiwayatFasilkom user={user} data={alumni.educations} />
        <Divider variant="middle" />
        <RiwayatPendLain data={alumni.otherEducations} />
        <Divider variant="middle" />
        <RiwayatKerja data={alumni.positions} />
        <Divider variant="middle" />
        {this.state.skillLoading ? (
          <LoadingFill />
        ) : (
          <Skills data={this.state.userSkills} />
        )}
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
