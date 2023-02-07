import { createRef } from 'react';
import { history } from '@umijs/max';
import { getWallet } from '@/utils/storage';

export const mountPortal = createRef<(node: React.ReactNode) => void>();
export const unmountPortal = createRef<() => void>();

export function routeGuard({ location }: { location: Location }) {
  const wallet = getWallet();

  if (location.pathname !== '/' && !wallet) {
    history.replace('/');
  }
}
