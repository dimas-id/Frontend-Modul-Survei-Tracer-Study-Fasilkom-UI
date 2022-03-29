import React from "react";
import { makeStyles } from "@material-ui/styles";
import isEmpty from "lodash/isEmpty";
import EmptyState from "../../../EmptyState";
import EmptyEducationImg from "../../../../assets/states/EmptyEducation.svg";
import Grid from "@material-ui/core/Grid";
import ExperienceItem from "../ExperienceItem";
import { getOtherEdus } from "../../../../modules/experience/selectors";
import { getUserId } from "../../../../modules/session/selectors";
import { loadOtherEdus } from "../../../../modules/experience/thunks";
import { connect } from "react-redux";

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: 24,
  },
});

function OtherEdu({ onAdd, onEdit, load, otherEdus, userId }) { 
  const classes = useStyles();
  const isOtherEdusEmpty = isEmpty(otherEdus);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    load(userId).finally(() => setLoading(false));
  }, [load, userId]);

  return (
    <React.Fragment>
      {!isLoading && isOtherEdusEmpty && (
        <EmptyState
          imgSrc={EmptyEducationImg}
          description="Dengan menambah <b>riwayat pendidikan</b>, teman-teman Anda akan bisa mengetahui pendidikan apa yang telah Anda tempuh di luar Fasilkom UI"
          ButtonProps={{
            onClick: onAdd,
          }}
        />
      )}
      {!isOtherEdusEmpty && (
        <Grid className={classes.gridContainer} container spacing={24}>
          {otherEdus.map(edu => (
            <Grid item xs={12} key={edu.id}>
              <ExperienceItem
                onClick={() => onEdit(edu.id)}
                key={edu.id}
                title={`${edu.degree} - ${edu.program}`}
                subtitle={`${edu.university}`}
                time={`${edu.classYear}${
                  edu.graduationYear
                    ? ` - ${edu.graduationYear}`
                    : " - Sekarang"
                }`}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {isLoading && (
        <Grid className={classes.gridContainer} container spacing={24}>
          {Array.apply(null, Array(4)).map((item, index) => (
            <Grid item xs={12} key={index}>
              <ExperienceItem loading />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    otherEdus: getOtherEdus(state),
    userId: getUserId(state),
  });

  const mapDispatchToProps = dispatch => ({
    load: userId => dispatch(loadOtherEdus(userId)),
  });
  return connect(mapStateToProps, mapDispatchToProps)(OtherEdu);
}

export default createContainer();
