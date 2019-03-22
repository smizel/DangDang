export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/order_manage/wait_order' },
      // {
      //   path: '/home/show',
      //   name: '数据展示',
      //   icon: 'home',
      //   component: './Home/Home',
      // },
      // {
      //   path: '/user_manage',
      //   name: '用户管理',
      //   icon: 'team',
      //   routes: [
      //     {
      //       path: '/user_manage/user_manage',
      //       name: '角色管理',
      //       component: './UserManage/UserManage',
      //       hideChildrenInMenu: true,
      //     },
      //   ],
      // },
      // {
      //   path: '/banner_manage',
      //   name: '轮播图管理',
      //   icon: 'picture',
      //   routes: [
      //     {
      //       path: '/banner_manage/banner_manage',
      //       name: '轮播图管理',
      //       component: './BannerManage/Banner',
      //       hideChildrenInMenu: true,
      //     },
      //   ],
      // },
      {
        path: '/order_manage',
        name: '预约管理',
        icon: 'clock-circle',
        routes: [

          {
            path: '/order_manage/wait_order',
            name: '待审核',
            component: './OrderManage/WaitOrder',
            hideChildrenInMenu: true,
          }, {
            path: '/order_manage/order_list',
            name: '已审核',
            component: './OrderManage/OrderList',
            hideChildrenInMenu: true,
          },
        ],
      },


      {
        component: '404',
      },
    ],
  },
];
