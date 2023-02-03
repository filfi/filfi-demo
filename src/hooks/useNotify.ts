import { useIntl, useModel } from '@umijs/max';

import Modal from '@/components/Modal';
import { sleep } from '@/utils/utils';

let close: (() => void) | null = null;

export default function useNotify() {
  const { formatMessage } = useIntl();
  const { setInitialState } = useModel('@@initialState');

  const hide = () => {
    setInitialState((state) => ({ ...state!, processing: false }));

    close?.();
  };

  const show = async (delay = 2e3) => {
    close = Modal.alert({
      title: formatMessage({ id: 'notify.transaction.title' }),
      content: formatMessage({ id: 'notify.transaction.content' }),
    });

    setInitialState((state) => ({ ...state!, processing: true }));

    await sleep(delay);

    hide();
  };


  return { hide, show };
}
