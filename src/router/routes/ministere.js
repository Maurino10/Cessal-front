const ministereRoutes = [
  {
    path: '/ministere',
    component: () => import("../../layouts/MinistereLayout.vue"),
    meta: { requiresAuth: true, requiredRole: 'ministere' },
    children: [
        {
            path: 'accueil',
            name: 'ministere-accueil',
            redirect: { name: 'ministere-cession-list' }
        },
        {
            path: 'cessions',
            component: () => import("../../views/user/ministere/GestionCession.vue"),
            redirect: { name: 'ministere-cession-list' },
            children: [
                {
                    path: 'liste',
                    name: 'ministere-cession-list',
                    component: () => import("../../views/user/ministere/cession/ListCession.vue")
                },
                {
                    path: ':id',
                    name: 'ministere-cession-details',
                    component: () => import("../../views/user/ministere/cession/DetailsCession.vue"),
                },
            ]
        }
    ]
  }
]

export default ministereRoutes