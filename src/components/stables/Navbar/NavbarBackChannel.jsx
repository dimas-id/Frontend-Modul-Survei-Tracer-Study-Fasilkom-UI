import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import NavbarBack from "./NavbarBack";
import paths from "../../../pages/paths";
import { makePathVariableUri } from "../../../libs/navigation";
import { Grid } from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {LoadingFill} from "../../../components/Loading";
import heliosV1 from "../../../modules/api/helios/v1";

const styles = theme => ({
    buttonCreate : {
        textAlign: "right"
    },
    formControl: {
      height: "50px"
    }
});

class NavbarBackChannel extends React.Component {
  state = {
    listChannel: null,
    isLoading: true,
  };  

  componentDidMount() {
    heliosV1.channel
      .getListChannel()
      .then(result => {
        this.setState({listChannel: result.data.results});
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

      handleChange = event => {
        this.props.history.push(
          makePathVariableUri(paths.CHANNEL_CHANT, {
            channelId: event.target.value
          })
        )
        };

      renderListChannel = () => {
        const { listChannel } = this.state
        return (
          <React.Fragment>
            {listChannel.map(channel => (
          <option value={channel.id}>{channel.title}</option>
      ))}
          </React.Fragment>
        );
      }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    return (
      <NavbarBack
        Content={(
          <Grid container spacing={24} >
            <Grid item xs={8}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
            htmlFor="channel"
          >
          Channel
          </InputLabel>
          <Select
            native
            onChange={this.handleChange}
            value={this.props.channelId}
            input={
              <OutlinedInput
                id="channel"
              />
            }
          >
           {isLoading ? <LoadingFill/> : this.renderListChannel()}
          </Select>
        </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.buttonCreate} justify="flex-end" float="right">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                component={Link}
                to={{
                  pathname: makePathVariableUri(paths.CHANNEL_CHANT_CREATE, {
                    channelId: this.props.channelId
                  }),
                  state: { parentId: this.props.chantId }
                }}
              >
                <b>Buat Chant</b>
              </Button>
            </Grid>
          </Grid>
        )}
      />
    );
  }
}

function createContainer() {
  return withRouter(
    withStyles(styles)(NavbarBackChannel)
  )
}

export default createContainer();
