import { normalizeKey } from '@/utils/storage';
import { useSessionStorageState } from 'ahooks';

export default function usePools() {
  const model = useSessionStorageState<API.Base | null>(normalizeKey('pools'));

  return model;
}
