export type IBestAFSRoute = {
  path?: string,
  name?: string;
  icon?: string;
  component?: string;
  redirect?: string;
  title?: string;
  wrappers?: string[];
  routes?: IBestAFSRoute[];
  // 更多功能查看
  // https://beta-pro.ant.design/docs/advanced-menu
  // ---
  // 新页面打开
  target?: string;
  // 不展示顶栏
  headerRender?: false;
  // 不展示页脚
  footerRender?: false;
  // 不展示菜单
  menuRender?: false;
  // 不展示菜单顶栏
  menuHeaderRender?: false;
  // 权限配置，需要与 plugin-access 插件配合使用
  access?: string;
  // 隐藏子菜单
  hideChildrenInMenu?: true;
  // 隐藏自己和子菜单
  hideInMenu?: true;
  // 在面包屑中隐藏
  hideInBreadcrumb?: true;
  // 子项往上提，仍旧展示,
  flatMenu?: true;
};

const routes: IBestAFSRoute[] = [
  {
    path: '/',
    name: 'home',
    component: './Home',
  },
  {
    name: 'assets',
    path: '/assets',
    component: './assets/layout',
    routes: [
      {
        path: 'supply',
        component: './assets/Supply',
      },
      {
        path: 'Borrow',
        component: './assets/Borrow',
      },
      { path: '/assets', redirect: '/assets/supply' },
    ],
  },
  {
    name: 'markets',
    path: '/markets',
    component: './Markets',
  },
];

export default routes;
