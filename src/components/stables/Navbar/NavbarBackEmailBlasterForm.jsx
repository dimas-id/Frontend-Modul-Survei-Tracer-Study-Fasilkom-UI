import React from "react";
import NavbarBack from "./NavbarBack";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function NavbarBackEmailBlasterForm({ onClick, title }) {
  return (
    <NavbarBack
      Content={
        <Grid container justify="flex-end" alignItems="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={onClick}>
              {title}
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
}
