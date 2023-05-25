import { toast } from "react-toastify";

function Toast(message, type = "default", autoClose = 3000, hideProgressBar = false, position="bottom-right", theme = "colored") {
  const options = {
    position: position,
    autoClose: autoClose,
    hideProgressBar: hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "warning") {
    toast.warning(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else if (type === "info") {
    toast.info(message, options);
  } else if (type === "default") {
    toast(message, options);
  } else {
  }
}

export default Toast;
