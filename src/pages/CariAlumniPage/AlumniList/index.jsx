import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
      to: makePathVariableUri(props.path, {idAlumni: props.idAlumni}),
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
      {props.data.map(item => (
        <TableCell>{item}</TableCell>
      ))}
    </TableRow>
  );
}

class AlumniList extends React.Component {
  state = {
    alumniList: null,
    loading: true,
  };

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query.triggerSearch !== this.props.query.triggerSearch) {
      this.handleLoad();
    }
  }

  handleLoad() {
    const { query } = this.props;
    const params = [];
    console.log(this.state.alumniList)  //TODO: hapus kalau udah ga perlu
    if (query) {
      params.push(query.nama);
      params.push(query.gender);
      params.push(query.domisili);
      params.push(query.angkatan);
      params.push(query.fromSemester);
      params.push(query.fromTahun);
      params.push(
        query.fromSemester === "" || query.fromTahun === ""
          ? ""
          : query.toSemester
      );
      params.push(
        query.fromSemester === "" || query.fromTahun === ""
          ? ""
          : query.toTahun
      );
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

  render() {
    const { loading, alumniList } = this.state;
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
              <TableWithPaginate
                rows={alumniList}
                columns={
                  user.isStaff || user.isSuperUser
                    ? [
                        { name: "Nama", width: "25%" },
                        { name: "Angkatan", width: "15%" },
                        { name: "Tahun Lulus", width: "15%" },
                        { name: "Gelar dan Program Studi", width: "20%" },
                        { name: "Posisi Pekerjaan", width: "25%" },
                      ]
                    : [
                        { name: "Nama", width: "25%" },
                        { name: "Angkatan", width: "15%" },
                        { name: "Gelar dan Program Studi", width: "20%" },
                        { name: "Posisi Pekerjaan", width: "20%" },
                        { name: "Perusahaan", width: "20%" },
                      ]
                }
                renderRow={(alumni, i) => (
                  <DataRow
                    rowKey={alumni.id}
                    data={
                      user.isStaff || user.isSuperUser
                        ? [
                            alumni.name,
                            alumni.educations.map(
                              (edu, i) => (i ? ", " : "") + edu.csuiClassYear
                            ),
                            alumni.graduateYear, //TODO: ganti graduateYear sesuai dari BE
                            alumni.educations.map(
                              (edu, i) => (i ? ", " : "") + edu.csuiProgram
                            ),
                            alumni.positions.length !== 0 &&
                            alumni.positions.find(({ isCurrent }) => isCurrent)
                              ? alumni.positions.find(
                                  ({ isCurrent }) => isCurrent
                                ).title
                              : "",
                          ]
                        : [
                            alumni.name,
                            alumni.educations.map(
                              (edu, i) => (i ? ", " : "") + edu.csuiClassYear
                            ),
                            alumni.educations.map(
                              (edu, i) => (i ? ", " : "") + edu.csuiProgram
                            ),
                            alumni.positions.length !== 0 &&
                            alumni.positions.find(({ isCurrent }) => isCurrent)
                              ? alumni.positions.find(
                                  ({ isCurrent }) => isCurrent
                                ).title
                              : "",
                            alumni.companyName, //TODO: ganti companyName sesuai dari BE
                          ]
                    }
                    path={paths.ALUMNI_DETAIL}
                    idAlumni={alumni.id}
                  />
                )}
              />
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
};
const MapStateToProps = state => ({
  user: getUser(state),
});
export default connect(MapStateToProps)(withStyles(styles)(AlumniList));
