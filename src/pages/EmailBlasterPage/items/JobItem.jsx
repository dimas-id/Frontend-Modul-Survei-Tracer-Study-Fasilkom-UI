import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import EventChip from "./EventChip";

import { Guidelines } from "../../../styles";

const useStyle = makeStyles(theme => ({
  jobItem: {
    borderColor: "#EBECF0",
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    boxSizing: "border-box",
    padding: 8,
    cursor: "pointer",
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexNowrap,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function JobItem({ job, onClick }) {
  const classes = useStyle();
  function handleClick(e) {
    e.target.value = job;
    onClick(e);
  }
  const { id, recipient, lastEventStatus } = job;
  return (
    <ListItem button id={id} className={classes.jobItem} onClick={handleClick}>
      <ListItemText
        primary={
          <Tooltip
            title={`Penerima ${recipient}`}
            aria-label={`Penerima ${recipient}`}
          >
            <Typography variant="body1" className={classes.primary}>
              {`${id} - ${recipient}`}
            </Typography>
          </Tooltip>
        }
      />
      <EventChip lastEventStatus={lastEventStatus} />
    </ListItem>
  );
}

JobItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
