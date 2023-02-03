import { normalizeKey } from '@/utils/storage';
import { useSessionStorageState } from 'ahooks';

export default function useBorrow() {
  const model = useSessionStorageState<API.Base | null>(normalizeKey('borrow'));

  return model;
}
