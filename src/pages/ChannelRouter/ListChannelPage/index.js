import { withLoadable } from "../../../components/hocs/loadable";
import { withDeviceRenderer } from "../../../libs/navigation";

export default withDeviceRenderer({
  DesktopVersion: withLoadable(() => import("./Desktop"))
});
