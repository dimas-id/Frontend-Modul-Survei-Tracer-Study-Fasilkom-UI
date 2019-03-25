import { toast } from 'react-toastify';
import './toast.style.css';
import { toastMiddleware } from './middleware';

export function createToastActions() {
  return {
    // show: data => toaster.show(data),
    // update: (key, data) => toaster.update(key, data),

    showToast: message => toast(message),

    showSuccessToast: message => {
      toast(message, {
        className: 'toast__success',
        bodyClassName: 'toast__body',
      });
    },

    showErrorToast: message => {
      toast(message, {
        className: 'toast__error',
        bodyClassName: 'toast__body',
      });
    },
  };
}

export const toastActions = createToastActions();
export { toastMiddleware };
