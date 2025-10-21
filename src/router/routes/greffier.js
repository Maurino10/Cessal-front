
const greffierRoutes = [
  {
    path: '/greffier',
    component: () => import('../../layouts/GreffierLayout.vue'),
    meta: { requiresAuth: true, requiredRole: "greffier" },
    children: [
      {
        path: 'accueil',
        name: 'greffier-accueil',
        redirect: { name: 'greffier-cession-list' }
      },
      
      // Cession routes
      {
        path: 'cessions',
        component: () => import('../../views/user/greffier/GestionCession.vue'),
        redirect: { name: 'greffier-cession-list' },
        children: [
          {
            path: 'liste',
            name: 'greffier-cession-list',
            component: () => import('../../views/user/greffier/cession/ListCession.vue'),
          },
          {
            path: 'ajouter',
            name: 'greffier-cession-add',
            component: () => import('../../views/user/greffier/cession/add/AddCession.vue'),
            redirect: { name: 'greffier-cession-add-infos' },
            children: [
              {
                  path: 'infos',
                  name: 'greffier-cession-add-infos',
                  component: () => import('../../views/user/greffier/cession/add/StepInfos.vue'),
              },
              {
                  path: ':id/preteurs',
                  name: 'greffier-cession-add-lenders',
                  component: () => import('../../views/user/greffier/cession/add/StepLenders.vue'),
              },
              {
                  path: ':id/emprunteur',
                  name: 'greffier-cession-add-borrowers',
                  component: () => import('../../views/user/greffier/cession/add/StepBorrowers.vue'),
              },
            ]
          },
          {
            path: ':id',
            name: 'greffier-cession-details',
            component: () => import('../../views/user/greffier/cession/DetailsCession.vue'),
            redirect: { name: 'greffier-cession-infos' },
            children:[
              {
                path: 'infos',
                name: 'greffier-cession-infos',
                component: () => import('../../views/user/greffier/cession/details/CessionInfo.vue'),
              },
              {
                path: 'preteurs',
                name: 'greffier-cession-lenders',
                component: () => import('../../views/user/greffier/cession/details/CessionLender.vue'),
              },
              {
                path: 'emprunteurs',
                name: 'greffier-cession-borrowers',
                component: () => import('../../views/user/greffier/cession/details/CessionBorrower.vue'),

              },
              {
                path: 'justificatifs',
                name: 'greffier-cession-justificatifs',
                component: () => import('../../views/user/greffier/cession/details/CessionJustificatifs.vue'),

              },
              {
                path: 'magistrat',
                name: 'greffier-cession-magistrat',
                component: () => import('../../views/user/greffier/cession/details/CessionMagistrat.vue'),
              },
              {
                path: 'impressions',
                name: 'greffier-cession-impressions',
                component: () => import('../../views/user/greffier/cession/details/CessionImpression.vue'),
              },
            ]
          },
          {
            path: ':id/justificatifs/ajouter',
            name: 'greffier-cession-justificatifs-add',
            component: () => import('../../views/user/greffier/cession/add/JustificatifCession.vue'),
          },
          {
            path: ':id/magistrat/assignation',
            name: 'greffier-cession-magistrat-assign',
            component: () => import('../../views/user/greffier/cession/add/AssignCession.vue'),
          },
          {
            path: 'cessions/:id/emprunteurs/:idBorrower',
            name: 'greffier-cession-borrowers-details',
            component: () => import('../../views/user/greffier/cession/details/DetailsCessionBorrower.vue'),
          },
        ]
      }
    ]
  }
]

export default greffierRoutes