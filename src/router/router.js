import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'home/bulletinList', title: '公告列表', name: 'bulletin_index', component: () => import('@/views/home/bulletinList/bulletinList.vue') },
        { path: 'home/bulletinList/:id', title: '公告详情', name: 'bulletinDetail_index', component: () => import('@/views/home/bulletinDetails/bulletinDetails.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/query',
        icon: 'person',
        name: 'query',
        component: Main,
        children: [
            { path: 'index', title: '单用户查询', name: 'query-index', component: () => import('@/views/user-query/user-query.vue') },
        ]
	},
	{
        path: '/label',
        icon: 'flag',
        name: 'label',
        component: Main,
        children: [
            { path: 'index', title: '标签口径查询', name: 'label-index', component: () => import('@/views/label-query/label-query.vue') },
        ]
	},
	{
        path: '/user',
        icon: 'person-stalker',
        name: 'user',
        component: Main,
        children: [
            { path: 'index', title: '用户管理', name: 'user-index', component: () => import('@/views/user/user.vue') },
        ]
	},
	{
        path: '/bulletin',
        icon: 'ios-bell',
        name: 'bulletin',
        component: Main,
        children: [
            { path: 'index', title: '公告设置', name: 'bulletin-index', component: () => import('@/views/bulletin/bulletin.vue') }
        ]
	},
	{
        path: '/permission',
        icon: 'android-contacts',
        name: 'permission',
        component: Main,
        children: [
            { path: 'index', title: '角色权限', name: 'permission-index', component: () => import('@/views/permission/permission.vue') }
        ]
	},
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
];
