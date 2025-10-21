import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
import adminRoutes from './routes/admin'
import greffierRoutes from './routes/greffier'
import magistratRoutes from './routes/magistrat'
import ministereRoutes from './routes/ministere'
import { authGuard, roleGuard } from './guards'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...adminRoutes,
    ...greffierRoutes,
    ...magistratRoutes,
    ...ministereRoutes,
  ], // par défaut uniquement auth
})

// Garde de navigation pour l'authentification
router.beforeEach(async (to, from, next) => {
  
  if (!authGuard(to, from, next) || !roleGuard(to, from, next)) {

    return;
  }

  next();

})



export default router