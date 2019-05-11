import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import EmptyState from "../EmptyState";
import ExperienceItem from "../ExperienceItem";
import EmptyPositionImg from "../../../../assets/states/EmptyPosition.svg";
import { getDateFormatted } from "../../../../libs/datetime";

import { loadPositions } from "../../../../modules/experience/thunks";
import { getWorkPositions } from "../../../../modules/experience/selectors";
import { getUserId } from "../../../../modules/session/selectors";

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: 24
  }
});

function WorkPosition({ onAdd, onEdit, load, positions, userId }) {
  const classes = useStyles();
  const isPositionsEmpty = isEmpty(positions);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    load(userId).finally(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      {!isLoading && isPositionsEmpty && (
        <EmptyState
          imgSrc={EmptyPositionImg}
          description="Dengan memperbarui <b>posisi pekerjaan</b>, teman-teman Anda akan lebih mudah menemukan Anda"
          ButtonProps={{
            onClick: onAdd
          }}
        />
      )}
      {!isPositionsEmpty && (
        <Grid className={classes.gridContainer} container spacing={24}>
          {positions.map(pos => (
            <Grid item xs={12} key={pos.id}>
              <ExperienceItem
                onClick={() => onEdit(pos.id)}
                key={pos.id}
                title={pos.title}
                subtitle={`${pos.companyName} - ${pos.industryName}`}
                time={`${getDateFormatted(pos.dateStarted, "MMM YYYY")} - ${
                  pos.dateEnded
                    ? getDateFormatted(pos.dateEnded, "MMM YYYY")
                    : "Sekarang"
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
    positions: getWorkPositions(state),
    userId: getUserId(state)
  });

  const mapDispatchToProps = dispatch => ({
    load: userId => dispatch(loadPositions(userId))
  });
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkPosition);
}

export default createContainer();
