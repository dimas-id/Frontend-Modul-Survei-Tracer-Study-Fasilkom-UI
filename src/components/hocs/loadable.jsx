import React, { lazy, Suspense } from 'react';
import { LoadingScreen } from '../Loading';

export function withLoadable(loader) {
  const Loadable = lazy(loader);
  return () => (
    <Suspense fallback={<LoadingScreen />}>
      <Loadable />
    </Suspense>
  );
}

export default {
  withLoadable,
};
