import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Guidelines } from "../../../styles";
import JotformEmbed from 'react-jotform-embed';
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { loadEducations } from "../../../modules/experience/thunks";
import { getEducations } from "../../../modules/experience/selectors";
import {
  getUser
} from "../../../modules/session/selectors";
import { Paper } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const styles = () => ({
  paper: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.generateMargin
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.mb48,
    fontSize: 20
  },
});

class IframePage extends React.Component {
  
  render() {

    const { classes, chartData } = this.props;
    return (
    <React.Fragment>
      <Typography className={classes.title} variant="h5" component="h3">
        Hasil Voting Kandidat Ketua Iluni
      </Typography>

      <Paper className={classes.paper} elevation={1}>
        
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Animation />
        </Chart>
      </Paper>
    </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    chartData: [
      { year: '1950', population: 2.525 },
      { year: '1960', population: 3.018 },
      { year: '1970', population: 3.682 },
      { year: '1980', population: 4.440 },
      { year: '1990', population: 5.310 },
      { year: '2000', population: 6.127 },
      { year: '2010', population: 6.930 },
    ],
  });

  return connect(
    mapStateToProps,
    )(withStyles(styles)(IframePage));
}

export default createContainer();