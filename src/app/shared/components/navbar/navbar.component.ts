import { Component, computed } from '@angular/core'
import { APP_PROPERTIES } from '../../../../properties'
import { CartService } from '../../services/cart.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public APP_PROPERTIES = APP_PROPERTIES
  public menuOptions = computed(() => {
    switch (this.authService.authUser()?.role) {
      case 'Admin':
        return [
          {
            label: 'Gestionar usuarios',
            icon: 'account-group',
            route: 'admin/users'
          },
          {
            label: 'Gestionar productos',
            icon: 'shoe-sneaker',
            route: 'admin/products'
          },
          {
            label: 'Gestionar compras',
            icon: 'package-variant-closed-check',
            route: 'admin/purchases'
          },
          {
            label: 'Mis tarjetas',
            icon: 'credit-card-multiple',
            route: 'cards'
          },
          {
            label: 'Mis compras',
            icon: 'package-variant',
            route: 'purchases'
          },
          {
            label: 'Perfil',
            icon: 'account',
            route: 'profile'
          }
        ]
      case 'User':
        return [
          {
            label: 'Mis tarjetas',
            icon: 'credit-card-multiple',
            route: 'cards'
          },
          {
            label: 'Mis compras',
            icon: 'package-variant',
            route: 'purchases'
          },
          {
            label: 'Perfil',
            icon: 'account',
            route: 'profile'
          }
        ]
      default:
        return []
    }
  })

  public constructor(
    public readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
