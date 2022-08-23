import React from "react";
import { Guidelines } from "../../../../styles";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
});

function AlumniSearchBar({ classes, path, pathUrl }) {
  const [value, setValue] = React.useState("");
  const history = useHistory();

  let urlProps = { href: pathUrl };
  if (path) {
    urlProps = {
      to: { pathname: path, state: { value: value } },
      component: Link,
    };
  }

  const handleClick = () => {
    history.push(path, { value: value });
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      history.push(path, { value: value });
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={10}>
        <Paper className={classes.paperChild} elevation={1}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <center>
                <IconButton disabled={value === ""} {...urlProps}>
                  <SearchIcon />
                </IconButton>
              </center>
            </Grid>
            <Grid item xs={11}>
              <InputBase
                style={{ width: "100%" }}
                placeholder="Cari alumni"
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onKeyPress={value ? e => handleEnter(e) : ""}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm>
        <center>
          <Button
            disabled={value === ""}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Cari Alumni
          </Button>
        </center>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(AlumniSearchBar);
