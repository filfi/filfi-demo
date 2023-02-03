import { ethers } from 'ethers';
import { useIntl, useModel } from '@umijs/max';

import Modal from '@/components/Modal';
import { toNumber } from '@/utils/format';

export default function useWallet() {
  const [wallet, setWallet] = useModel('wallet');
  const { setInitialState } = useModel('@@initialState');

  const { formatMessage } = useIntl();

  const fetchWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setWallet({ address, balance: toNumber(balance) });
      setInitialState((state) => ({ ...state!, connected: true }));
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      Modal.alert({ icon: 'warn', content: formatMessage({ id: 'notify.warn.matemask' }) });
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    setInitialState((state) => ({
      ...state!,
      connected: false,
      connecting: true,
    }))

    await provider.send('eth_requestAccounts', []);

    await fetchWallet();

    setInitialState((state) => ({
      ...state!,
      connected: true,
      connecting: false,
    }));
  };

  return { wallet, connect, fetchWallet, setWallet };
}
