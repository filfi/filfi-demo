import { history } from '@umijs/max';
import { getWallet } from '@/utils/storage';

export function routeGuard({ location }: { location: Location }) {
  const wallet = getWallet();

  if (location.pathname !== '/' && !wallet) {
    history.replace('/');
  }
}
