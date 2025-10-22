export const authGuard = (to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
  
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
        return false
    }
  
    return true
}

export const roleGuard = (to, from, next) => {
    const userRole = localStorage.getItem('role');
    
    if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
        
        const dashboardPath = getDashboardPath(userRole);
        next(dashboardPath); 

        return false;   
    }
    
    return true
}


function getDashboardPath(role) {
  switch(role) {
    case 'admin':
      return '/admin/accueil';
    case 'greffier':
      return '/greffier/accueil';
    case 'magistrat':
      return '/magistrat/accueil';
    case 'admin_local':
      return '/administrateur/local/accueil';
    default:
      return '/login';
  }
}