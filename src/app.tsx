/**
 * 运行时配置
 */

import { routeGuard } from '@/helpers/app';
import { getLocale, setLocale } from '@/utils/storage';

/**
 * @see https://v3.umijs.org/zh-CN/plugins/plugin-locale#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE
 */
export const locale = {
  getLocale,
  setLocale({
    lang,
    realReload,
    updater,
  }: {
    lang: string;
    realReload: boolean;
    updater: () => void;
  }) {
    setLocale(lang);

    if (realReload) {
      window.location.reload();
    }

    updater?.();
  },
};

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
