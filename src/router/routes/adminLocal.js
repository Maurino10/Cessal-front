const adminLocalRoutes = [
  {
    path: '/administrateur/local',
    component: () => import("../../layouts/AdminLocalLayout.vue"),
    meta: { requiresAuth: true, requiredRole: 'admin_local' },
    children: [
        {
            path: 'accueil',
            name: 'admin-local-accueil',
            redirect: { name: 'admin-local-cession-list' }
        },
        {
            path: 'cessions',
            component: () => import("../../views/user/adminLocal/GestionCession.vue"),
            redirect: { name: 'admin-local-cession-list' },
            children: [
                {
                    path: 'liste',
                    name: 'admin-local-cession-list',
                    component: () => import("../../views/user/adminLocal/cession/ListCession.vue")
                },
                {
                    path: ':id',
                    name: 'admin-local-cession-details',
                    component: () => import("../../views/user/adminLocal/cession/DetailsCession.vue"),
                },
            ]
        }
    ]
  }
]

export default adminLocalRoutes