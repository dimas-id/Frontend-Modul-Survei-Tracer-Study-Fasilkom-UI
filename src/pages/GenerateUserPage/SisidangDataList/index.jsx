import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import atlasV1 from "../../../modules/api/atlas/v1";
import atlasV2 from "../../../modules/api/atlas/v2";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { LoadingFill } from "../../../components/Loading";
import TableWithPaginate from "../../../components/TableWithPaginate";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Container } from "../../../components/Container";
import Typography from "@material-ui/core/Typography";
import emptyContactImg from "../../../assets/states/EmptyContact.svg";
import { Guidelines } from "../../../styles/index.js";

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  tableCell: {
    flex: 1,
  },
  container: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flexDirCol,
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    ...Guidelines.fonts.bold,
    fontSize: 16,
  },
});

function DataRow(props) {
  return (
    <TableRow key={props.rowKey}>
      {props.data.map(item => (
        <TableCell>{item}</TableCell>
      ))}
    </TableRow>
  );
}

class SisidangDataList extends React.Component {
  state = {
    dataList: null,
    userSuccess: null,
    userFailed: null,
    loading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query.triggerFetch !== this.props.query.triggerFetch) {
      this.handleFetch();
    }
  }

  handleFetch() {
    const { query } = this.props;
    const params = [];

    if (query) {
      params.push(query.tahun);
      params.push(query.semester);
    }

    this.setState({ loading: true }, () => {
      atlasV1.sisidang
        .getSisidangDataList(...params)
        .then(result => {
          this.setState({ dataList: result.data.data });
          this.setState({ userSuccess: null });
          this.setState({ userFailed: null });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  handleBulkCreate = () => {
    this.setState({ loading: true }, () => {
      atlasV2.session
        .bulkCreateUser()
        .then(result => {
          this.setState({ userSuccess: result.data.userSuccess });
          this.setState({ userFailed: result.data.userFailed });
          this.setState({ dataList: null });
        })
        .finally(() => {
          this.setState({ loading: false });

          if (
            this.state.userSuccess.length > 0 &&
            this.state.userFailed.length === 0
          ) {
            window.notifySnackbar(`Semua pengguna berhasil dibuat`, {
              variant: "success",
            });
          } else if (
            this.state.userSuccess.length > 0 &&
            this.state.userFailed.length > 0
          ) {
            window.notifySnackbar(`Terdapat pengguna yang gagal dibuat`, {
              variant: "warning",
            });
          } else if (
            this.state.userSuccess.length === 0 &&
            this.state.userFailed.length > 0
          ) {
            window.notifySnackbar(`Semua pengguna gagal dibuat`, {
              variant: "error",
            });
          }
        });
    });
  };

  render() {
    const { dataList, userSuccess, userFailed, loading } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {loading && (
          <React.Fragment>
            <LoadingFill />
          </React.Fragment>
        )}
        {!loading && dataList !== null && (
          <React.Fragment>
            <br />
            {dataList.length > 0 ? (
              <>
                <Grid item className={classes.item} xs={12} sm={10}>
                  <Typography className={classes.label} component="p">
                    Daftar Pengguna yang akan Dibuat
                  </Typography>
                </Grid>
                <Grid item className={classes.item} xs={12} sm={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleBulkCreate}
                  >
                    Buat Pengguna
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableWithPaginate
                    rows={dataList}
                    columns={[
                      { name: "Nama", width: "35%" },
                      { name: "NPM", width: "20%" },
                      { name: "Angkatan", width: "20%" },
                      { name: "Program Studi", width: "25%" },
                    ]}
                    renderRow={(data, i) => (
                      <DataRow
                        rowKey={i}
                        data={[
                          data.firstName + " " + data.lastName,
                          data.education.uiSsoNpm,
                          data.education.csuiClassYear,
                          data.education.csuiProgram,
                        ]}
                      />
                    )}
                  />
                </Grid>
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
                  Data tidak ditemukan.
                </Typography>
              </Container>
            )}
          </React.Fragment>
        )}
        {!loading && (userSuccess !== null || userFailed !== null) && (
          <React.Fragment>
            {userSuccess.length > 0 && userFailed.length > 0 && (
              <>
                <Grid item className={classes.item} xs={12} sm={12}>
                  <Typography className={classes.label} component="p">
                    Daftar Pengguna yang Berhasil Dibuat
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableWithPaginate
                    rows={userSuccess}
                    columns={[
                      { name: "Nama", width: "35%" },
                      { name: "NPM", width: "20%" },
                      { name: "Angkatan", width: "20%" },
                      { name: "Program Studi", width: "25%" },
                    ]}
                    renderRow={(data, i) => (
                      <DataRow
                        rowKey={i}
                        data={[
                          data.name,
                          data.educations.map(
                            (edu, i) => (i ? ", " : "") + edu.uiSsoNpm
                          ),
                          data.educations.map(
                            (edu, i) => (i ? ", " : "") + edu.csuiClassYear
                          ),
                          data.educations.map(
                            (edu, i) => (i ? ", " : "") + edu.csuiProgram
                          ),
                        ]}
                      />
                    )}
                  />
                </Grid>
                <Grid item className={classes.item} xs={12} sm={12}>
                  <Typography className={classes.label} component="p">
                    Daftar Pengguna yang Gagal Dibuat
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableWithPaginate
                    rows={userFailed}
                    columns={[
                      { name: "Nama", width: "30%" },
                      { name: "NPM", width: "15%" },
                      { name: "Angkatan", width: "15%" },
                      { name: "Program Studi", width: "20%" },
                      { name: "Alasan", width: "20%" },
                    ]}
                    renderRow={(data, i) => (
                      <DataRow
                        rowKey={i}
                        data={[
                          data[0].firstName + " " + data[0].lastName,
                          data[0].education.uiSsoNpm,
                          data[0].education.csuiClassYear,
                          data[0].education.csuiProgram,
                          data[1].map(item => (
                            <>
                              Invalid {item}
                              <br />
                            </>
                          )),
                        ]}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {userSuccess.length === 0 && userFailed.length > 0 && (
              <>
                <Grid item className={classes.item} xs={12} sm={12}>
                  <Typography className={classes.label} component="p">
                    Daftar Pengguna yang Gagal Dibuat
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableWithPaginate
                    rows={userFailed}
                    columns={[
                      { name: "Nama", width: "30%" },
                      { name: "NPM", width: "15%" },
                      { name: "Angkatan", width: "15%" },
                      { name: "Program Studi", width: "20%" },
                      { name: "Alasan", width: "20%" },
                    ]}
                    renderRow={(data, i) => (
                      <DataRow
                        rowKey={i}
                        data={[
                          data[0].firstName + " " + data[0].lastName,
                          data[0].education.uiSsoNpm,
                          data[0].education.csuiClassYear,
                          data[0].education.csuiProgram,
                          data[1].map(item => (
                            <>
                              Invalid {item}
                              <br />
                            </>
                          )),
                        ]}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

SisidangDataList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = state => ({});

export default connect(MapStateToProps)(withStyles(styles)(SisidangDataList));
