import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

import atlasV1 from "../../../modules/api/atlas/v1";
import { Guidelines } from "../../../styles/index.js";
import { NavbarModal } from "../../../components/stables/Navbar/index.js";
import { LoadingFill } from "../../../components/Loading/";
import WrappedVirtualizedTable from "../../../components/stables/WrappedVirtualizedTable";

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  },
  modalPaper: {
    ...Guidelines.layouts.flexMiddle
  },
  modalBody: {
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.w100,
      ...Guidelines.layouts.h100
    },
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  profilePic: {
    borderRadius: "50%",
    width: "50px",
    height: "50px"
  }
});

class ContactList extends React.Component {
  state = {
    openModal: false,
    currentContact: null,
    contactList: null,
    loading: true
  };

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.handleLoad();
    }
  }

  handleLoad() {
    const { query } = this.props;
    const params = [];

    if (query) {
      params.push(query.name);
      if (query.categories) {
        params.push(query.categories);
      }
    }

    console.log(params)
    this.setState({ loading: true }, () => {
      atlasV1.contact
        .getContactList(...params) // func(...[name, category]) => func(name, category)
        .then(result => {
          this.setState({ contactList: result.data.results });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  modalOpen = event => {
    this.setState({ openModal: true, currentContact: event.rowData });
  };

  modalClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { loading, currentContact, contactList } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper style={{ height: "65vh", width: "100%" }}>
          {loading && (
            <React.Fragment>
              <LoadingFill />
            </React.Fragment>
          )}
          {!loading && (
            <React.Fragment>
              <WrappedVirtualizedTable
                rowCount={contactList.length}
                rowGetter={({ index }) => contactList[index]}
                onRowClick={this.modalOpen}
                loading
                columns={[
                  {
                    width: 180,
                    flexGrow: 1.0,
                    label: "Nama",
                    dataKey: "name"
                  },
                  {
                    width: 120,
                    label: "Angkatan",
                    dataKey: "latestCsuiClassYear",
                    numeric: true
                  },
                  {
                    width: 190,
                    label: "Email",
                    dataKey: "email"
                  },
                  {
                    width: 160,
                    label: "Nomor Telepon",
                    dataKey: "phoneNumber"
                  }
                ]}
              />
            </React.Fragment>
          )}
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.modalClose}
          className={classes.modalPaper}
        >
          {currentContact && (
            <div>
              <NavbarModal buttonAlign="right" onClick={this.modalClose} />
              <div className={classes.modalBody}>
                <Grid
                  container
                  spacing={24}
                  alignItems={"center"}
                  justify={"flex-start"}
                >
                  <Grid item xs={3}>
                    <img
                      src={currentContact.profilePictureUrl}
                      className={classes.profilePic}
                      alt="profile pic of somebody"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5">
                      <b>{currentContact.name || "-"}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <b>Angkatan Terakhir</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.latestCsuiClassYear || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>Prodi Terakhir</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.latestCsuiProgram || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>NPM</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.uiSsoNpm || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>Email</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.email || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>No Telepon</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.phoneNumber || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>Kota, Negara</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.residenceCity +
                      ", " +
                      currentContact.residenceCountry || "-"}
                  </Grid>

                  <Grid item xs={5}>
                    <b>Website</b>
                  </Grid>
                  <Grid item xs={7}>
                    {currentContact.websiteUrl || "-"}
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}
ContactList.propTypes = {
  classes: PropTypes.object.isRequired
};
const MapStateToProps = state => ({});
export default connect(MapStateToProps)(withStyles(styles)(ContactList));
