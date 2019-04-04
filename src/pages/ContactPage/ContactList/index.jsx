import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";

import fixture from "../fixture.json";
import { Guidelines } from "../../../styles/index.js";
import { NavbarModal } from "../../../components/stables/Navbar/index.js";

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

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

class ContactList extends React.Component {
  state = {
    openModal: false,
    currentContact: null
  };

  modalOpen = event => {
    this.setState({ openModal: true, currentContact: event.rowData });
  };

  modalClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
    const { currentContact } = this.state;

    return (
      <React.Fragment>
        <Paper style={{ height: 400, width: "100%" }}>
          <WrappedVirtualizedTable
            rowCount={fixture.results.length}
            rowGetter={({ index }) => fixture.results[index]}
            onRowClick={this.modalOpen}
            columns={[
              {
                width: 190,
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
                      alt='profile pic of somebody'
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

export default withStyles(styles)(ContactList);
