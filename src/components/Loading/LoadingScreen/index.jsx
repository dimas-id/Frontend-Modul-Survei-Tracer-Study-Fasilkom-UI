import React from 'react';
import LoadingScreen from '../LoadingFill';

export default props => (
  <div style={{ height: '100vh', width: '100vw' }}>
    <LoadingScreen {...props} />
  </div>
);
