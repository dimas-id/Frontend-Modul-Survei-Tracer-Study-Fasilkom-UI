import React, { useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import EmptyBatchIcon from "@material-ui/icons/AssignmentLateOutlined";
import EmptyIcon from "@material-ui/icons/AlternateEmailOutlined";
import Typography from "@material-ui/core/Typography";

import { authorize } from "../../components/hocs/auth";
import { LoadingFill } from "../../components/Loading";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { mailerAction } from "../../modules/crm/mailer";
import { selectBatches, selectJobs } from "../../modules/crm/mailer/selectors";
import {
  deleteBatchById,
  getBatches,
  getJobs,
  sendBatch,
} from "../../modules/crm/mailer/thunks";
import BatchItem from "./items/BatchItem";
import JobItem from "./items/JobItem";
import JobDetail from "./JobDetail";
import NavbarEmailBlaster from "./NavbarEmailBlaster";
import { Guidelines } from "../../styles";

const useStyle = makeStyles(theme => ({
  paper: {
    ...Guidelines.layouts.mt32,
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
    },
  },
  container: {
    padding: 12,
    minHeight: 730,
  },
  gridItemContainer: {
    borderColor: "#EBECF0",
    borderWidth: 2,
    borderStyle: "solid",
    flexGrow: 1,
    overflowY: "auto",
    maxHeight: 730,
  },
  list: {
    padding: 0,
    height: "100%",
  },
  listSubheading: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexNowrap,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
  },
  emptyContainer: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.h100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 8,
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
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      borderRadius: 4,
    },
  },
}));

function getCurrentCondition() {
  const currentHour = parseInt(moment().format("HH"), 10);
  if (currentHour < 6 || currentHour > 15) {
    return "night";
  } else if (currentHour < 10) {
    return "morning";
  } else {
    return "noon";
  }
}

function EmptyList({ message, Icon }) {
  const classes = useStyle();
  return (
    <div className={classes.emptyContainer}>
      <Icon
        className={classNames(
          classes.emptyIcon,
          classes[getCurrentCondition()]
        )}
      />
      <Typography variant="body1">{message}</Typography>
    </div>
  );
}

function EmailBlasterPage({
  batches,
  jobs,
  loadBatches,
  loadJobs,
  clearJobs,
  send,
  deleteBatch,
}) {
  const classes = useStyle();
  const [selectedBatch, setBatch] = React.useState(null);
  const [loadingBatches, setLoadingBatches] = React.useState(true);

  const [selectedJob, setJob] = React.useState(null);
  const [loadingJobs, setLoadingJobs] = React.useState(false);
  const [isProcessing, setProcessing] = React.useState(false);

  const [state, setState] = React.useState({ batchCount: 0, jobCount: 0 });

  function handleBatchClick({ target }) {
    if (target.value !== selectedBatch) {
      setBatch(target.value);
      setJob(null);
    }
  }

  function handleJobClick({ target }) {
    if (target.value !== selectedJob) {
      setJob(target.value);
    }
  }

  function withProcessing(promise) {
    return function() {
      setProcessing(true);
      return promise(selectedBatch.id).finally(() => {
        setProcessing(false);
      });
    };
  }

  const handleLoadJob = useCallback(() => {
    setLoadingJobs(true);
    loadJobs(selectedBatch.id)
      .then(({ data }) => {
        setState(Object.assign(state, { jobCount: data.count }));
      })
      .finally(() => {
        setLoadingJobs(false);
      });
  }, [loadJobs, selectedBatch.id, state]);

  function handleDelete() {
    const func = withProcessing(deleteBatch);
    window.alertDialog(
      `Hapus batch ${selectedBatch.id}`,
      "Apakah anda yakin ingin menghapus?",
      () =>
        func().then(() => {
          setBatch(null);
          setJob(null);
        }),
      () => {}
    );
  }

  function handleSend() {
    const func = withProcessing(send);
    window.alertDialog(
      `Kirim batch ${selectedBatch.id}`,
      "Email yang telah diproses tidak dapat dikirim ulang. " +
        "Pengiriman hanya memproses email yang gagal atau belum terkirim. Lanjutkan?",
      func,
      () => {}
    );
  }

  const disabledBatchButton = !Boolean(selectedBatch) || isProcessing;

  React.useEffect(() => {
    clearJobs();
    loadBatches().then(({ data }) => {
      setState(Object.assign(state, { batchCount: data.count }));
      setLoadingBatches(false);
    });
  }, [clearJobs, loadBatches, state]);

  React.useEffect(() => {
    if (selectedBatch) {
      handleLoadJob();
    }
  }, [handleLoadJob, selectedBatch]);

  return (
    <React.Fragment>
      <NavbarAuth title="Email Blaster" />
      <Container>
        <Paper elevation={1} className={classes.paper}>
          <NavbarEmailBlaster
            ButtonDeleteBatchProps={{
              onClick: handleDelete,
              disabled: disabledBatchButton,
            }}
            ButtonSendBatchProps={{
              onClick: handleSend,
              disabled: disabledBatchButton,
            }}
          />
          <Grid container spacing={0} className={classes.container}>
            <Grid item md={3} className={classes.gridItemContainer}>
              <List
                className={classes.list}
                subheader={
                  <ListSubheader
                    className={classes.listSubheading}
                    component="div"
                  >
                    Batches ({state.batchCount})
                  </ListSubheader>
                }
              >
                {loadingBatches ? (
                  <LoadingFill />
                ) : isEmpty(batches) ? (
                  <EmptyList message="Belum ada batch" Icon={EmptyBatchIcon} />
                ) : (
                  <Slide
                    direction="down"
                    in={!loadingBatches}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div>
                      {batches.map(batch => (
                        <BatchItem
                          key={batch.id}
                          batch={batch}
                          onClick={handleBatchClick}
                        />
                      ))}
                    </div>
                  </Slide>
                )}
              </List>
            </Grid>
            <Grid item md={3} className={classes.gridItemContainer}>
              <List
                className={classes.list}
                subheader={
                  <ListSubheader
                    className={classes.listSubheading}
                    component="div"
                  >
                    <div>Jobs ({state.jobCount})</div>
                    <Tooltip title="Muat ulang daftar job">
                      <IconButton
                        onClick={handleLoadJob}
                        disabled={disabledBatchButton}
                      >
                        <RefreshIcon aria-label="Muat ulang daftar job" />
                      </IconButton>
                    </Tooltip>
                  </ListSubheader>
                }
              >
                {loadingJobs ? (
                  <LoadingFill className={classes.loading} />
                ) : isEmpty(jobs) ? (
                  <EmptyList message="Belum ada job" Icon={EmptyIcon} />
                ) : (
                  <Slide
                    direction="down"
                    in={!loadingBatches && !loadingJobs}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div>
                      {jobs.map(job => (
                        <JobItem
                          key={job.id}
                          job={job}
                          onClick={handleJobClick}
                        />
                      ))}
                    </div>
                  </Slide>
                )}
              </List>
            </Grid>
            <Grid item md={6} className={classes.gridItemContainer}>
              <JobDetail job={selectedJob} batch={selectedBatch} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    batches: selectBatches(state),
    jobs: selectJobs(state),
  });

  const mapDispatchToProps = dispatch => ({
    loadBatches: () => dispatch(getBatches()),
    loadJobs: batchId => dispatch(getJobs(batchId)),
    deleteBatch: batchId => dispatch(deleteBatchById(batchId)),
    send: batchId => dispatch(sendBatch(batchId)),
    clearJobs: () => dispatch(mailerAction.clearJobs()),
  });

  return authorize({
    roles: [authorize.roles.STAFF, authorize.roles.SUPERUSER],
    mustVerified: false,
  })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(EmailBlasterPage)
    )
  );
}

export default createContainer();
