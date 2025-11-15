


const magistratRoutes = [
  {
    path: '/magistrat',
    component: () => import("../../layouts/MagistratLayout.vue"),
    meta: { requiresAuth: true, requiredRole: 'magistrat' },
    children: [
        {
            path: 'accueil',
            name: 'magistrat-accueil',
            redirect: { name: 'magistrat-cession-list' }
        },
        {
            path: 'cessions',
            component: () => import("../../views/user/magistrat/cession/GestionCession.vue"),
            redirect: { name: 'magistrat-cession-list' },
            children: [
                {
                    path: 'liste',
                    name: 'magistrat-cession-list',
                    component: () => import("../../views/user/magistrat/cession/ListCession.vue")
                },
                {
                    path: ':id',
                    name: 'magistrat-cession-details',
                    component: () => import("../../views/user/magistrat/cession/DetailsCession.vue"),
                },
            ]
        },

        // Mon profil
        {
            path: 'profil',
            name: 'magistrat-profil',
            component: () => import('../../views/user/magistrat/profil/DetailsProfil.vue'),
        }
    ]
  }
]

export default magistratRoutes