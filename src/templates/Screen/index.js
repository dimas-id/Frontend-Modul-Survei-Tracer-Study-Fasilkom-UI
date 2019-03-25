import { withLoadable } from '../../components-hoc/loadable';
import { withDeviceRenderer } from '../../commons/navigation';

export default withDeviceRenderer({
  DesktopVersion: withLoadable(() => import('./Desktop')),
  MobileVersion: withLoadable(() => import('./Mobile')),
});
