import { useSessionStorageState } from 'ahooks';

import { normalizeKey } from '@/utils/storage';

export default function usePools() {
  const model = useSessionStorageState<API.Base | null>(normalizeKey('pools'));

  return model;
}
