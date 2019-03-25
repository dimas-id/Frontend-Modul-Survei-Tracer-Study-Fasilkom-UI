import React from 'react';
import LoadingScreen from '../LoadingScreen';
import Logo from '../../../assets/logo.svg';

export default () => (
  <div style={{ height: '100vh', width: '100vw' }}>
    <LoadingScreen>
      <img src={Logo} alt="Logo" height={200} width={200} />
    </LoadingScreen>
  </div>
);
