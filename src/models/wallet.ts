import { useSessionStorageState } from 'ahooks';

import { Keys, normalizeKey } from '@/utils/storage';

export default function useWallet() {
  const state = useSessionStorageState<API.Base | null>(normalizeKey(Keys.Wallet));

  return state
}
