import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { authGuard } from './shared/guards/auth.guard'

const routes: Routes = [
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
    canActivate: [authGuard]
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin/products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [authGuard]
  },
  {
    path: 'purchases',
    loadChildren: () => import('./purchases/purchases.module').then(m => m.PurchasesModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin/purchases',
    loadChildren: () =>
      import('./manage-purchases/manage-purchases.module').then(m => m.ManagePurchasesModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'store'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
