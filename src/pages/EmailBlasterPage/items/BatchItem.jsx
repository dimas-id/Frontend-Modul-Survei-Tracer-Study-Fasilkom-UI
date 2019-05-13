import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Create";
import {getDateFormatted} from "../../../libs/datetime";
import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";
import { Guidelines } from "../../../styles";

const useStyle = makeStyles(theme => ({
  batchItem: {
    borderColor: "#EBECF0",
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    boxSizing: "border-box",
    padding: 20,
    cursor: "pointer",
  },
  inline: {
    display: "inline",
  },
  noTextOverflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ownerText: {
    paddingRight: 16,
    boxSizing: "border-box",
  },
  primary: {
    marginBottom: 4,
    fontWeight: 700,
  },
  wrapperSecondary: {
    ...Guidelines.layouts.flexDirCol,
  },
}));

export default function BatchItem({ batch, onClick }) {
  const classes = useStyle();
  function handleClick(e) {
    e.target.value = batch;
    onClick(e);
  }

  const { id, title, dateCreated, owner, senderAddress, hasDispatched } = batch;
  return (
    <ListItem
      button
      id={id}
      className={classes.batchItem}
      onClick={handleClick}
    >
      <ListItemText
        primary={
          <Typography
            className={classNames(classes.primary, classes.noTextOverflow)}
          >
            {title}
          </Typography>
        }
        secondary={
          <div className={classes.wrapperSecondary}>
            <Typography
              component="div"
              className={classes.inline}
              color="textPrimary"
            >
              Dikirim dari {senderAddress}
            </Typography>
            <Tooltip title={owner} aria-label={owner} placement="top">
              <Typography
                component="div"
                className={classNames(
                  classes.noTextOverflow,
                  classes.inline,
                  classes.ownerText
                )}
                color="textPrimary"
              >
                {`Dibuat oleh ${owner}`}
              </Typography>
            </Tooltip>
            <Typography
              component="div"
              className={classes.inline}
              color="textSecondary"
            >
              {`${getDateFormatted(dateCreated, "YYYY-MM-DD, HH:mm")}`}
            </Typography>
          </div>
        }
      />
      <ListItemSecondaryAction>
        <Tooltip title="Ubah batch" aria-label="Ubah batch">
          <IconButton
            component={Link}
            to={makePathVariableUri(paths.CRM_EMAIL_BATCH_UPDATE, {
              batchId: id,
            })}
            aria-label="Edit"
          >
            <EditIcon aria-disabled={hasDispatched} />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

BatchItem.propTypes = {
  batch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
