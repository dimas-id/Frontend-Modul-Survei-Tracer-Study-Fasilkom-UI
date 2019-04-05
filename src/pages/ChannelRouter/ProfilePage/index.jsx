import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Container } from "../../../components/Container";
import ChantCard from "../../../components/stables/Chant";
import EndCard from "../../../components/stables/EndCard";

import { Guidelines } from "../../../styles";

import fixture from "./fixture.json";

const styles = theme => ({
  card : {
    ...Guidelines.layouts.ml64,
    ...Guidelines.layouts.mb8,
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
      <div className = {classes.card}>
        <ChantCard key={chant.id} dateCreated={chant.dateCreated} 
        numberLikes={chant.numberLikes} title={chant.title} body={chant.body}
        channel={chant.channel} id={chant.id}/>
      </div>  
        ))}
    <EndCard marginLeft="64"/>
    </Container>
  );
});
