import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Container } from "../../../components/Container";
import ChantCard from "../../../components/stables/Chant";

import { Guidelines } from "../../../styles";

import fixture from "./fixture.json";


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
    {fixture.map(chant => (
        <ChantCard key={chant.id} dateCreated={chant.dateCreated} numberLikes={chant.numberLikes} title={chant.title} body={chant.body}/>
        ))}
    </Container>
  );
});
