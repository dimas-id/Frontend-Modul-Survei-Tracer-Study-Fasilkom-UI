import React from "react";
import Grid from "@material-ui/core/Grid";

import EmptyState from "../EmptyState";
import ExperienceItem from "../ExperienceItem";
import EmptyEducationImg from "../../../../assets/states/EmptyEducation.svg";
import { getDateFormatted } from "../../../../libs/datetime";
import fixtures from "./fixtures.json";

export default function Education(props) {
  return (
    <React.Fragment>
      <EmptyState
        imgSrc={EmptyEducationImg}
        ButtonProps={{
          onClick: this.handleOpenNewForm
        }}
      />
      <Grid container spacing={24}>
        {fixtures.map(edu => (
          <Grid item xs={12}>
            <ExperienceItem
              key={edu.id}
              title={edu.schoolName}
              subtitle={`${edu.degreeName} - ${edu.fieldOfStudy}`}
              time={`${getDateFormatted(
                edu.dateStarted,
                "YYYY"
              )} - ${getDateFormatted(edu.dateEnded, "YYYY")}`}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
