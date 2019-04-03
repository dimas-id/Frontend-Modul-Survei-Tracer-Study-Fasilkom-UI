import React from "react";

import Grid from "@material-ui/core/Grid";

import FormDialog from "../../../FormDialog";
import EducationForm from "../EducationForm";
import EmptyState from "../EmptyState";
import Title from "../Title";
import ExperienceItem from "../ExperienceItem";
import EmptyEducationImg from "../../../../assets/states/EmptyEducation.svg";
import { getDateFormatted } from "../../../../libs/datetime";
import fixtures from "./fixtures.json";

class Education extends React.Component {
  state = {
    openModal: false
  };

  handleOpenNewForm = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <Title
          ButtonProps={{
            onClick: this.handleOpenNewForm,
            hidden: false
          }}
        >
          Riwayat Pendidikan
        </Title>
        <EmptyState
          imgSrc={EmptyEducationImg}
          description="Dengan memperbarui data <b>riwayat pendidikan</b>, teman-teman Anda akan lebih mudah menemukan Anda"
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
        <FormDialog open={this.state.openModal} title="Tambah">
          <EducationForm />
        </FormDialog>
      </React.Fragment>
    );
  }
}

export default Education;
