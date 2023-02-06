import { useSessionStorageState } from 'ahooks';

import { normalizeKey } from '@/utils/storage';

export default function useBorrow() {
  const model = useSessionStorageState<API.Base | null>(normalizeKey('borrow'));

  return model;
}
