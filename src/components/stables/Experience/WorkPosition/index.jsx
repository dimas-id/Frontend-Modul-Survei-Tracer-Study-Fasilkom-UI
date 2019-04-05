import React from "react";

import Grid from "@material-ui/core/Grid";

import EmptyState from "../EmptyState";
import Title from "../Title";
import ExperienceItem from "../ExperienceItem";
import EmptyPositionImg from "../../../../assets/states/EmptyPosition.svg";
import { getDateFormatted } from "../../../../libs/datetime";
import fixtures from "./fixtures.json";

function WorkPosition({ onAdd }) {
  return (
    <React.Fragment>
      <Title
        ButtonProps={{
          onClick: onAdd,
          hidden: false
        }}
      >
        Riwayat Pendidikan
      </Title>
      <EmptyState
        imgSrc={EmptyPositionImg}
        description="Dengan memperbarui data <b>riwayat pendidikan</b>, teman-teman Anda akan lebih mudah menemukan Anda"
        ButtonProps={{
          onClick: onAdd
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

export default WorkPosition;
