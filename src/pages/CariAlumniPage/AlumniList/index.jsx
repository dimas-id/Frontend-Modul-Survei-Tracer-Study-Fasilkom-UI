import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { getUser } from "../../../modules/session/selectors";
import Typography from "@material-ui/core/Typography";
import atlasV2 from "../../../modules/api/atlas/v2";
import { Guidelines } from "../../../styles/index.js";
import { LoadingFill } from "../../../components/Loading";
import TableWithPaginate from "../../../components/TableWithPaginate";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import emptyContactImg from "../../../assets/states/EmptyContact.svg";
import { Container } from "../../../components/Container";
import { Link } from "react-router-dom";
import paths from "../../paths";
import { makePathVariableUri } from "../../../libs/navigation";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
  profilePic: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  },
  container: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100,
  },
  emptyImg: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "35%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50%",
    },
  },
  desc: {
    fontSize: 20,
    maxWidth: 500,
  },
});

function DataRow(props) {
  let urlProps = { href: props.pathUrl };
  if (props.path) {
    urlProps = {
      to: makePathVariableUri(props.path, { idAlumni: props.idAlumni }),
      component: Link,
    };
  }

  const [hover, setHover] = useState(false);
  return (
    <TableRow
      key={props.rowKey}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        background: hover ? "#eeeeee" : "",
        textDecoration: "none",
      }}
      {...urlProps}
    >
      {props.data.map((item, i) =>
        i === 0 ? (
          <TableCell>
            <img
              style={{ maxWidth: "41px" }}
              src={item}
              alt="user-profile-pic"
            />
          </TableCell>
        ) : (
          <TableCell>{item}</TableCell>
        )
      )}
    </TableRow>
  );
}

class AlumniList extends React.Component {
  state = {
    alumniList: null,
    loading: true,
    dataInCsv: null,
    loadingCsv: true,
  };

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.handleLoad();
      this.handleExport();
    } else if (
      this.props.location.state &&
      this.props.location.state.value === ""
    ) {
      this.handleLoad();
      this.handleExport();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query.triggerSearch !== this.props.query.triggerSearch) {
      this.handleLoad();
      this.handleExport();
    }
  }

  handleLoad() {
    const { query } = this.props;
    const params = [];

    if (query) {
      params.push(query.nama);
      params.push(query.gender);
      params.push(query.lokasi);
      params.push(query.angkatan);
      params.push(query.fromSemester);
      params.push(query.fromTahun);
      params.push(query.toSemester);
      params.push(query.toTahun);
      params.push(query.gelar);
      params.push(query.posisi);
      params.push(query.industri);
      params.push(query.perusahaan);
    }

    this.setState({ loading: true }, () => {
      atlasV2.alumni
        .getAlumniList(...params)
        .then(result => {
          this.setState({ alumniList: result.data.results });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  handleExport = () => {
    const { query } = this.props;
    const params = [];

    if (query) {
      params.push(query.nama);
      params.push(query.gender);
      params.push(query.lokasi);
      params.push(query.angkatan);
      params.push(query.fromSemester);
      params.push(query.fromTahun);
      params.push(query.toSemester);
      params.push(query.toTahun);
      params.push(query.gelar);
      params.push(query.posisi);
      params.push(query.industri);
      params.push(query.perusahaan);
    }

    this.setState({ loadingCsv: true }, () => {
      atlasV2.alumni
        .exportAlumni(...params)
        .then(result => {
          this.setState({ dataInCsv: result.data });
        })
        .finally(() => {
          this.setState({ loadingCsv: false });
        });
    });
  };

  render() {
    const { loading, alumniList, loadingCsv, dataInCsv } = this.state;
    const { classes, user } = this.props;

    return (
      <React.Fragment>
        {loading && (
          <React.Fragment>
            <LoadingFill />
          </React.Fragment>
        )}
        {!loading && (
          <React.Fragment>
            {alumniList.length > 0 ? (
              <>
                <TableWithPaginate
                  rows={alumniList}
                  columns={
                    user.isStaff || user.isSuperUser
                      ? [
                          { name: "", width: "5%" },
                          { name: "Nama", width: "20%" },
                          { name: "Angkatan", width: "15%" },
                          { name: "Tahun Lulus", width: "15%" },
                          { name: "Gelar dan Program Studi", width: "20%" },
                          { name: "Posisi Saat Ini", width: "25%" },
                        ]
                      : [
                          { name: "", width: "5%" },
                          { name: "Nama", width: "20%" },
                          { name: "Angkatan", width: "15%" },
                          { name: "Gelar dan Program Studi", width: "20%" },
                          { name: "Posisi Saat Ini", width: "20%" },
                          { name: "Perusahaan", width: "20%" },
                        ]
                  }
                  renderRow={(alumni, i) => (
                    <DataRow
                      rowKey={alumni.id}
                      data={
                        user.isStaff || user.isSuperUser
                          ? [
                              alumni.profile.profilePicUrl,
                              alumni.name,
                              alumni.educations.map(
                                (edu, i) => (i ? ", " : "") + edu.csuiClassYear
                              ),
                              alumni.educations.map((edu, i) =>
                                edu.csuiGraduationTerm && edu.csuiGraduationYear
                                  ? (i ? ", " : "") +
                                    (edu.csuiGraduationTerm === 1
                                      ? "Genap " + (edu.csuiGraduationYear - 1)
                                      : "Ganjil " + edu.csuiGraduationYear)
                                  : ""
                              ),
                              alumni.educations.map(
                                (edu, i) => (i ? ", " : "") + edu.csuiProgram
                              ),
                              alumni.positions.length !== 0 &&
                              alumni.positions.find(
                                ({ isCurrent }) => isCurrent
                              )
                                ? alumni.positions.find(
                                    ({ isCurrent }) => isCurrent
                                  ).title
                                : "",
                            ]
                          : [
                              alumni.profile.profilePicUrl,
                              alumni.name,
                              alumni.educations.map(
                                (edu, i) => (i ? ", " : "") + edu.csuiClassYear
                              ),
                              alumni.educations.map(
                                (edu, i) => (i ? ", " : "") + edu.csuiProgram
                              ),
                              alumni.positions.length !== 0 &&
                              alumni.positions.find(
                                ({ isCurrent }) => isCurrent
                              )
                                ? alumni.positions.find(
                                    ({ isCurrent }) => isCurrent
                                  ).title
                                : "",
                              alumni.positions.length !== 0 &&
                              alumni.positions.find(
                                ({ isCurrent }) => isCurrent
                              )
                                ? alumni.positions.find(
                                    ({ isCurrent }) => isCurrent
                                  ).companyName
                                : "",
                            ]
                      }
                      path={paths.ALUMNI_DETAIL}
                      idAlumni={alumni.id}
                    />
                  )}
                />

                {(user.isStaff || user.isSuperUser) &&
                  (loadingCsv ? (
                    <LoadingFill />
                  ) : (
                    <a
                      href={`data:text/csv;charset=utf-8,${escape(dataInCsv)}`}
                      download="students-export.csv"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 24 }}
                      >
                        Export Sebagai CSV
                      </Button>
                    </a>
                  ))}
              </>
            ) : (
              <Container className={classes.container}>
                <img
                  src={emptyContactImg}
                  alt="Empty"
                  className={classes.emptyImg}
                />
                <Typography
                  component="p"
                  align="center"
                  className={classes.desc}
                >
                  Maaf, alumni tidak ditemukan.
                </Typography>
              </Container>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
AlumniList.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
const MapStateToProps = state => ({
  user: getUser(state),
});
export default connect(MapStateToProps)(
  withRouter(withStyles(styles)(AlumniList))
);
