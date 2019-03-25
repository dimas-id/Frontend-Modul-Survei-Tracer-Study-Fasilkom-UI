import { withLoadable } from '../../../components-hoc/loadable';
import { withDeviceRenderer } from '../../../commons/navigation';

export default withDeviceRenderer({
  MobileVersion: withLoadable(() => import('./Mobile')),
});
