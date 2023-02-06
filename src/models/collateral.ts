import { useSessionStorageState } from 'ahooks';

import { normalizeKey } from '@/utils/storage';

export default function useCollateral() {
  const model = useSessionStorageState<API.Base | null>(
    normalizeKey('collateral'),
  );

  return model;
}
