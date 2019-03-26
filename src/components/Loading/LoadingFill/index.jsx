import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { layouts } from '../../../styles/guidelines';

export default class LoadingScreen extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        style={{
          ...layouts.flexDirCol,
          ...layouts.flexMiddle,
          ...layouts.w100,
          ...layouts.h100,
          flexGrow: 1,
          flex: 1,
        }}
      >
        {children}
        <CircularProgress />
      </div>
    );
  }
}
