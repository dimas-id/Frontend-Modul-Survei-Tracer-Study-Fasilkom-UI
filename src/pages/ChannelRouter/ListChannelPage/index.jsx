import React from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Guidelines } from "../../../styles";

import fixture from "./fixture.json";
import { Container } from "../../../components/Container";
import ChannelCard from "./ChannelCard";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.mb8,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pb24,
    ...Guidelines.layouts.borderBox
  },
  chantWrapper: {
    maxHeight: 64,
    lineHeight: 64,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  actions: {
    display: "flex",
    ...Guidelines.layouts.flexDirCol,
    alignItems: "flex-start"
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <Container className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Daftar Channel
      </Typography>
      <Grid container spacing={12}>
        {fixture.map(channel => (
          <Grid item xs={4}>
            <ChannelCard
              key={channel.id}
              title={channel.title}
              coverImgUrl={channel.coverImgUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
});

