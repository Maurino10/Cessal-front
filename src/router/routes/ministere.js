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
            component: () => import("../../views/user/ministere/cession/GestionCession.vue"),
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
        },

        // Mon profil
        {
            path: 'profil',
            name: 'ministere-profil',
            component: () => import('../../views/user/greffier/profil/DetailsProfil.vue'),
        }
    ]
  }
]

export default ministereRoutes