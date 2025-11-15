
const adminRoutes = [
  {
    path: '/admin',
    component: () => import('../../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    redirect: '/admin/accueil',
    children: [
      {
        path: 'accueil',
        name: 'admin-accueil',
        redirect: { name: 'admin-dashboard' }
      },
      
      // Dashboard
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('../../views/admin/dashboard/Dashboard.vue'),
      },
      {
        path: 'dashboard/ca/:id',
        name: 'admin-dashboard-ca',
        component: () => import('../../views/admin/dashboard/DetailsCA.vue'),
      },
      // Instances routes
      {
        path: 'instances',
        component: () => import('../../views/admin/instances/GestionInstances.vue'),
        redirect: { name: 'admin-instance-tpi' },
        children: [
          {
            path: 'tpi',
            name: 'admin-instance-tpi',
            component: () => import('../../views/admin/instances/tpi/ListTPI.vue')
          },
          {
            path: 'ca',
            name: 'admin-instance-ca',
            component: () => import('../../views/admin/instances/ca/ListCA.vue')
          }
        ]
      },
      
      // Territories routes
      {
        path: 'territoires',
        component: () => import('../../views/admin/territories/GestionTerritories.vue'),
        redirect: { name: 'admin-territory-province' },
        children: [
          {
            path: 'provinces',
            name: 'admin-territory-province',
            component: () => import('../../views/admin/territories/province/ListProvince.vue')
          },
          {
            path: 'regions',
            name: 'admin-territory-region',
            component: () => import('../../views/admin/territories/region/ListRegion.vue')
          },
          {
            path: 'districts',
            name: 'admin-territory-district',
            component: () => import('../../views/admin/territories/district/ListDistrict.vue')
          }
        ]
      },
      
      // Users management routes
      {
        path: 'utilisateurs',
        component: () => import('../../views/admin/users/GestionUsers.vue'),
        redirect: { name: 'admin-user-list' },
        children: [
          {
            path: 'utilisateurs',
            name: 'admin-user-list',
            component: () => import('../../views/admin/users/user/ListUser.vue')
          },
          {
            path: 'utilisateurs/:id/profil',
            name: 'admin-user-profil',
            component: () => import('../../views/admin/users/user/ProfilUser.vue'),
          },
          {
            path: 'inscriptions',
            name: 'admin-user-inscriptions',
            component: () => import('../../views/admin/users/inscription/ListInscription.vue')
          }
        ]
      },
      
      // Import routes
      {
        path: 'importations',
        name: 'admin-import',
        component: () => import('../../views/admin/imports/Importation.vue')
      },
      // Paramètre routes
      {
        path: 'parametres',
        name: 'admin-setting',
        component: () => import('../../views/admin/settings/Settings.vue'),
        children: [
          {
            path: '',
            name: 'admin-setting-accueil',
            component: () => import('../../views/admin/settings/ListSetting.vue'),
          },
          {
            path: 'provision',
            name: 'admin-setting-provision',
            component: () => import('../../views/admin/settings/provision/Provision.vue'),
          }
        ]
      },
      {
        path: 'cessions',
        component: () => import("../../views/admin/cessions/GestionCession.vue"),
        redirect: { name: 'admin-cession-list' },
        children: [
            {
                path: 'liste',
                name: 'admin-cession-list',
                component: () => import("../../views/admin/cessions/ListCession.vue")
            },
            {
                path: ':id',
                name: 'admin-cession-details',
                component: () => import("../../views/admin/cessions/DetailsCession.vue"),
            },
        ]
      }
    ]
  }
]

export default adminRoutes