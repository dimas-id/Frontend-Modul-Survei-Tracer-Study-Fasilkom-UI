import { withLoadable } from "../../../components/hocs/loadable";
import { withDeviceRenderer } from "../../../libs/navigation";

export default withDeviceRenderer({
  MobileVersion: withLoadable(() => import("./Desktop"))
});