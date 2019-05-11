import React from "react";

import findIndex from "lodash/findIndex";
import pick from "lodash/pick";
import remove from "lodash/remove";
import debounce from "lodash/debounce";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";

import emptyContactImg from "../../../assets/states/EmptyContact.svg";
import { LoadingFill } from "../../../components/Loading";
import { useContactSearch } from "../../../components/stables/Contacts";
import VirtualizedTable from "../../../components/VirtualizedTable";
import Select from "../../../components/Select";
import { Guidelines } from "../../../styles";

const useStyle = makeStyles(theme => ({
  headContainer: {
    ...Guidelines.layouts.w100,
  },
  paper: {
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100,
    height: "50vh",
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  emptyStateContainer: {
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 1,
  },
}));

const CATEGORIES_SELECTION = [
  { label: "Bisa dihubungi", value: "could_contact_me" },
  { label: "Acara", value: "should_send_event" },
  { label: "Lowongan", value: "should_send_vacancy" },
  { label: "Newsletter", value: "should_send_newsletter" },
  { label: "Donasi", value: "should_send_donation_info" },
  { label: "Info lainnya", value: "should_send_update" },
];

function renderCategoryItems(value) {
  return CATEGORIES_SELECTION.map(item => (
    <Select.Item key={item.id} value={item} selected={item.value === value}>
      {item.label}
    </Select.Item>
  ));
}

export default React.memo(function({ selected = [], onSelect = val => {} }) {
  const classes = useStyle();
  const [query, setQuery] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [valCategories, setValCategories] = React.useState([]);

  const [contacts, loading] = useContactSearch(query, valCategories);

  function handleQueryChange(e) {
    e.persist(); // without it, the event would become synthetic event
    debounce(function(e) {
      setQuery(e.target.value);
    }, 500)(e);
  }

  function handleCategoryChange(e) {
    e.persist();
    debounce(function({ target }) {
      setCategories(target.value);
      setValCategories(target.value.map(cat => cat.value))
    }, 500)(e);
  }

  const isSelected = val => findIndex(selected, ["id", val.id]) !== -1;

  const getValue = rowData => pick(rowData, ["id"]);

  function handleSelectContact({ rowData }) {
    if (rowData) {
      const value = getValue(rowData);
      const newSelected = [...selected];
      if (isSelected(value)) {
        remove(newSelected, obj => obj.id === value.id);
      } else {
        newSelected.push(value);
      }

      onSelect(newSelected);
    }
  }

  function handleSelectAllContact({ target }) {
    const tmpContacts = [...contacts];
    if (target.checked) {
      const newSelected = tmpContacts.map(contact => getValue(contact));
      newSelected.push(...selected);
      const selectedSet = new Set(newSelected);
      onSelect(Array.from(selectedSet));
      return;
    }

    onSelect([]);
  }

  const numSelected = selected.length;
  const rowCount = contacts.length;

  return (
    <React.Fragment>
      <Grid container spacing={24} className={classes.grid}>
        <Grid item xs={12} sm={8}>
          <TextField
            id="outlined-query"
            margin="normal"
            variant="outlined"
            label="Nama/Email kontak"
            placeholder="Cari kontak..."
            fullWidth
            onChange={handleQueryChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            id="outlined-category"
            margin="normal"
            variant="outlined"
            label="Kategori"
            fullWidth
            onChange={handleCategoryChange}
            value={categories}
            SelectProps={{
              multiple: true,
              renderValue: selected => (
                <div className={classes.chips}>
                  {selected.map(item => (
                    <Chip
                      key={item.value}
                      label={item.label}
                      className={classes.chip}
                    />
                  ))}
                </div>
              ),
            }}
          >
            {renderCategoryItems(categories)}
          </Select>
        </Grid>
      </Grid>
      <Paper elevation={1} className={classes.paper}>
        {loading && <LoadingFill />}
        {!loading && (
          <React.Fragment>
            {contacts.length > 0 ? (
              <VirtualizedTable
                rowCount={contacts.length}
                rowGetter={({ index }) => contacts[index]}
                onRowClick={handleSelectContact}
                columns={[
                  {
                    width: 64,
                    rowPadding: "checkbox",
                    headerRenderer: () => {
                      return (
                        <Checkbox
                          indeterminate={
                            numSelected > 0 && numSelected < rowCount
                          }
                          disabled={loading}
                          checked={numSelected === rowCount}
                          onChange={handleSelectAllContact}
                        />
                      );
                    },
                    cellContentRenderer: props => {
                      const value = getValue(props.rowData);
                      return (
                        <Checkbox checked={isSelected(value)} color="primary" />
                      );
                    },
                  },
                  {
                    width: 190,
                    flexGrow: 1,
                    label: "Nama",
                    dataKey: "name",
                  },
                  {
                    width: 120,
                    label: "Angkatan",
                    dataKey: "latestCsuiClassYear",
                    numeric: true,
                  },
                  {
                    width: 200,
                    flexGrow: 1,
                    label: "Email",
                    dataKey: "email",
                  },
                ]}
              />
            ) : (
              <div className={classes.emptyStateContainer}>
                <img
                  src={emptyContactImg}
                  alt="Empty"
                  className={classes.emptyImg}
                />
                <Typography variant="body1" component="p" align="center">
                  Maaf kontak tidak ditemukan
                </Typography>
              </div>
            )}
          </React.Fragment>
        )}
      </Paper>
    </React.Fragment>
  );
});
