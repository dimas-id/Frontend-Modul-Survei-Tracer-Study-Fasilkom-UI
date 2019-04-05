import React from "react";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import EmptyState from "../EmptyState";
import Title from "../Title";
import ExperienceItem from "../ExperienceItem";
import EmptyPositionImg from "../../../../assets/states/EmptyPosition.svg";
import { getDateFormatted } from "../../../../libs/datetime";
import fixtures from "./fixtures.json";

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: 24,
  }
})

function WorkPosition({ onAdd, onEdit }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {!Boolean(fixtures) && <EmptyState
        imgSrc={EmptyPositionImg}
        description="Dengan memperbarui <b>posisi pekerjaan</b>, teman-teman Anda akan lebih mudah menemukan Anda"
        ButtonProps={{
          onClick: onAdd
        }}
      />}
      <Grid className={classes.gridContainer} container spacing={24}>
        {fixtures.map(pos => (
          <Grid item xs={12}>
            <ExperienceItem
              onClick={onEdit}
              key={pos.id}
              title={pos.title}
              subtitle={`${pos.companyName} - ${pos.industryName}`}
              time={`${getDateFormatted(pos.dateStarted, "MMM YYYY")} - ${
                pos.dateEnded
                  ? getDateFormatted(pos.dateEnded, "MMM YYYY")
                  : "Masih"
              }`}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default WorkPosition;
