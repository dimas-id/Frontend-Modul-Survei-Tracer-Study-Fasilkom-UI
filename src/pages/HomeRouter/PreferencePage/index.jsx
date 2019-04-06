import React from "react";

import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import { Guidelines } from "../../../styles";
import { Grid } from "@material-ui/core";

const styles = makeStyles({
    paper: {
      ...Guidelines.layouts.pt32,
      ...Guidelines.layouts.pr32,
      ...Guidelines.layouts.pl32,
      ...Guidelines.layouts.pb32
    },
    title: {
      ...Guidelines.layouts.flexMiddle,
      ...Guidelines.fonts.medium,
      fontSize: 32
    },
    subtitle: {
      ...Guidelines.layouts.flexMiddle,
      fontSize: 20
    },
    paperChild: {
      ...Guidelines.layouts.mt24,
      ...Guidelines.layouts.pt24,
      ...Guidelines.layouts.pr24,
      ...Guidelines.layouts.pl24,
      ...Guidelines.layouts.pb24
    },
    head: {
      ...Guidelines.layouts.w100,
      display: "flex",
      justifyContent: "space-between"
    },
    preference: {
      ...Guidelines.layouts.mb32,
      ...Guidelines.fonts.normal,
      fontSize: 24
    },
    gridField: {
      display: "flex",
      alignItems: "center"
    },
    label: {
      ...Guidelines.fonts.bold,
      fontSize: 16
    },
    value: {
      fontSize: 16
    }
  });

  function Head(props) {
    const classes = styles();
    return (
      <div className={classes.head}>
        <Typography className={classes.preference} variant="h5" component="h3">
          {props.children}
        </Typography>
        {props.onChange && (
            <Switch
            checked={this.state.checkedB}
            onChange={this.handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />

        )}
      </div>
    );
  }
  
export default function(props) {
    const classes = styles();
    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.title} variant="h5" component="h3">
            Preferensi
          </Typography>
          <Typography className={classes.subtitle} component="p">
          Preferensi Anda yang membantu membuat layanan ILUNI12 Channel lebih berguna bagi Anda
          </Typography>
  
          <Paper className={classes.paperChild} elevation={1}>
            <Head onChange={() => null} >
              Profil
            </Head>
          </Paper>
        </Paper>
      </React.Fragment>
    );
  }