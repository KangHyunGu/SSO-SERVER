
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/auth/LoginPage.vue')},
      { path: 'join', component: () => import('pages/auth/JoinPage.vue')},
    ]
  },
  {
    path: '/adm',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { name:"AdmHome", path: '', component: () => import('pages/admin/AdminIndex.vue') },
      { name:"AdmAllow", path: '/allow', component: () => import('pages/admin/AllowSite.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
