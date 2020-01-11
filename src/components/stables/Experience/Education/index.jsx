import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import EmptyState from "../EmptyState";
import ExperienceItem from "../ExperienceItem";
import EmptyEducationImg from "../../../../assets/states/EmptyEducation.svg";
import { getDateFormatted } from "../../../../libs/datetime";

import { loadEducations } from "../../../../modules/experience/thunks";
import { getEducations } from "../../../../modules/experience/selectors";
import { getUserId } from "../../../../modules/session/selectors";

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: 24
  }
});

function Education({ load, educations, userId }) {
  const classes = useStyles();
  const isEduEmpty = isEmpty(educations);

  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    load(userId).finally(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      {!isLoading && isEduEmpty && (
        <EmptyState
          imgSrc={EmptyEducationImg}
          description="Belum berhasil mendapatkan data pendidikan anda di Fasilkom UI"
          ButtonProps={{
            hidden: true
          }}
        />
      )}
      {isLoading && (
        <Grid className={classes.gridContainer} container spacing={24}>
          {Array.apply(null, Array(4)).map((_, index) => (
            <Grid item xs={12} key={index}>
              <ExperienceItem loading />
            </Grid>
          ))}
        </Grid>
      )}
      {!isEduEmpty && (
        <Grid className={classes.gridContainer} container spacing={24}>
          {educations.map(edu => (
            <Grid item xs={12} key={edu.id}>
              <ExperienceItem
                key={edu.id}
                title={edu.schoolName}
                subtitle={`${edu.degreeName} - ${edu.fieldOfStudy} - ${edu.uiSsoNpm}`}
                time={`${getDateFormatted(
                  edu.dateStarted,
                  "YYYY"
                )} - ${getDateFormatted(edu.dateEnded, "YYYY")}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    educations: getEducations(state),
    userId: getUserId(state)
  });

  const mapDispatchToProps = dispatch => ({
    load: userId => dispatch(loadEducations(userId))
  });
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Education);
}

export default createContainer();
