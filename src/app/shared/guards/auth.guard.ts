import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { ADMIN_ROUTES, AUTH_ROUTES, NON_AUTH_ROUTES } from '../constants/routes.constant'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const path = route.routeConfig!.path!
  const authUser = authService.authUser()

  if (NON_AUTH_ROUTES.includes(path) && authUser) {
    router.navigateByUrl('/store')
    return false
  }
  if (AUTH_ROUTES.includes(path) && !authUser) {
    router.navigateByUrl('/login')
    return false
  }
  if (ADMIN_ROUTES.includes(path) && authUser?.role !== 'Admin') {
    router.navigateByUrl('/store')
    return false
  }

  return true
}
