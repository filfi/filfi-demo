import { normalizeKey } from '@/utils/storage';
import { useSessionStorageState } from 'ahooks';

export default function useCollateral() {
  const model = useSessionStorageState<API.Base | null>(normalizeKey('collateral'));

  return model;
}
