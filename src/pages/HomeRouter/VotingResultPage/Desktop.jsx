import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Guidelines } from "../../../styles";
import JotformEmbed from 'react-jotform-embed';
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
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
import { getVotingResult } from '../../../modules/session/selectors'
import { loadVotingResult } from '../../../modules/session/thunks'

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
    // const client = new GoogleSheetsClient();
    // let data = await client.get('0')
    // console.log(data)
    const { classes, chartData } = this.props;
    console.log("chartData", chartData)
    return (
    <React.Fragment>
      <Typography className={classes.title} variant="h5" component="h3">
        Hasil Voting Kandidat Ketua Iluni
      </Typography>
      {chartData && 
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
      }
    </React.Fragment>
    );
  }
}

function createContainer() {

  const mapStateToProps = state => ({
    chartData: getVotingResult(state)
  });

  console.log("aknsvdajknsvdjkasvkbdjvakshjdvajk")
  const mapDispatchToProps = dispatch => ({
    load: dispatch(loadVotingResult()),
  });
  console.log("kmbkbkbkmbkbkjbk")

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    )(withStyles(styles)(IframePage));
}

export default createContainer();