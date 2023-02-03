import { defineConfig } from '@umijs/max';

type IConfig = Parameters<typeof defineConfig>[0];
type OmitType<T, U> = (T extends U ? never : T);
type ProxyOptions = Required<IConfig>['proxy'];
type Options = OmitType<ProxyOptions, unknown[]>;

const options: Options = {
  '/api': {},
};

export default options;
