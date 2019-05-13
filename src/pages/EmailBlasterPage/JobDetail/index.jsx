import React from "react";
import classNames from "classnames";
import moment from "moment";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EmptyMorningIcon from "@material-ui/icons/LocalFloristOutlined";
import EmptyAfternoonIcon from "@material-ui/icons/CloudOutlined";
import EmptyNightIcon from "@material-ui/icons/Brightness2Outlined";
import { getUser, isLoggedIn } from "../../../modules/session/selectors";

import { Guidelines } from "../../../styles";
import EventChip from "../items/EventChip";

import { getDateFormatted } from "../../../libs/datetime";

const useStyle = makeStyles(theme => ({
  root: {
    ...Guidelines.layouts.pt48,
    ...Guidelines.layouts.pb48,
    ...Guidelines.layouts.pr48,
    ...Guidelines.layouts.pl48,
  },
  emptyContainer: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.h100,
  },
  emptyIcon: {
    fontSize: 96,
    marginBottom: 12,
  },
  night: {
    color: "#022047",
  },
  noon: {
    color: "#00C7E5",
  },
  morning: {
    color: "#FFDEBE",
  },
  header: {},
  headerTop: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexNowrap,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
    flexGrow: 1,
  },
  btn: {
    margin: theme.spacing.unit,
  },
  btnDel: {
    color: "#E24C4C",
    borderColor: "#E24C4C",
  },
  chip: {
    marginLeft: 12,
  },
  paper: {
    ...Guidelines.layouts.pt8,
    ...Guidelines.layouts.pb8,
    ...Guidelines.layouts.pr8,
    ...Guidelines.layouts.pl8,
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.mb16,
    borderColor: "#EBECF0",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    boxSizing: "border-box",
  },
}));

function getNowHour() {
  return parseInt(moment().format("HH"), 10);
}

export default connect(state => ({
  user: getUser(state),
  loggedIn: isLoggedIn(state),
}))(function JobDetail({ job, batch, loggedIn, user, }) {
  const classes = useStyle();

  if (loggedIn && !job && !batch) {
    const currentHour = getNowHour();
    let Icon = null;
    let message = `Selamat %s, ${user.firstName}`;
    let iconClassName = "";

    if (currentHour < 6 || currentHour > 15) {
      Icon = EmptyNightIcon;
      message = message.replace(/%s/g, "malam");
      iconClassName = "night";
    } else if (currentHour < 10) {
      Icon = EmptyMorningIcon;
      message = message.replace(/%s/g, "pagi");
      iconClassName = "morning";
    } else {
      Icon = EmptyAfternoonIcon;
      message = message.replace(/%s/g, "siang");
      iconClassName = "noon";
    }

    return (
      <div className={classNames(classes.root, classes.emptyContainer)}>
        <Icon
          className={classNames(classes.emptyIcon, classes[iconClassName])}
        />
        <Typography variant="h5">{message}</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Fade in={Boolean(batch)}>
        {batch ? (
          <React.Fragment>
            <div className={classes.header}>
              <Typography component="h1" variant="h3">
                Batch {batch.id}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {batch.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Dibuat tanggal{" "}
                {getDateFormatted(batch.dateCreated, "YYYY-MM-DD, HH:mm")}
              </Typography>
              <Paper elevation={0} className={classes.paper}>
                <Typography variant="h6" color="textPrimary">
                  Alamat Pengirim
                  <Typography variant="subtitle1" color="textSecondary">
                    {batch.senderAddress}
                  </Typography>
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  Subject
                  <Typography variant="subtitle1" color="textSecondary">
                    {batch.subject}
                  </Typography>
                </Typography>
              </Paper>
            </div>
            <hr />
          </React.Fragment>
        ) : (
          <div />
        )}
      </Fade>
      <Fade in={Boolean(job)}>
        {job ? (
          <React.Fragment>
            <div className={classes.header}>
              <div className={classes.headerTop}>
                <Typography component="h2" variant="h4">
                  Job {job.id}
                  <EventChip
                    lastEventStatus={job.lastEventStatus}
                    className={classes.chip}
                  />
                </Typography>
              </div>
              <Typography variant="body1" color="textSecondary">
                Dibuat tanggal{" "}
                {getDateFormatted(job.dateCreated, "YYYY-MM-DD, HH:mm")}
              </Typography>
              {job.dateDispatched && (
                <Typography variant="body1" color="textSecondary">
                  Dikirim tanggal{" "}
                  {getDateFormatted(job.dateDispatched, "YYYY-MM-DD, HH:mm")}
                </Typography>
              )}
            </div>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h6" color="textPrimary">
                ID Penerima
                <Typography variant="subtitle1" color="textSecondary">
                  {job.recipient}
                </Typography>
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Isi
                <Typography variant="subtitle1" color="textSecondary">
                  {job.body}
                </Typography>
              </Typography>
            </Paper>
          </React.Fragment>
        ) : (
          <div />
        )}
      </Fade>
    </div>
  );
});
