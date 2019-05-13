import React from "react";
import classNames from 'classnames'
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({
  chipDelivered: {
    backgroundColor: "#4CE2A7",
    color: "#fff",
  },
  chipCreated: {
    backgroundColor: "#2D4EF5",
    color: "#fff",
  },
  chipQueued: {
    backgroundColor: "#F1A153",
    color: "#fff",
  },
}));

export default function EventChip({ lastEventStatus, className }) {
  const classes = useStyle();
  return (
    <Chip
      label={lastEventStatus}
      className={classNames(classes[`chip${lastEventStatus}`], className)}
    />
  );
}
