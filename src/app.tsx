/**
 * 运行时配置
 */

import { routeGuard } from '@/helpers/app';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return {
    connected: false,
    connecting: false,
    processing: false,
  };
}

export function onRouteChange(data: { location: Location }) {
  routeGuard(data);
}
