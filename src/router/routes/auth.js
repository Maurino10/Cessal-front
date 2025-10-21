
const authRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../views/auth/user/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../../views/auth/user/Register.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../../views/auth/admin/LoginAdmin.vue'),
    meta: { requiresGuest: true }
  }
]

export default authRoutes