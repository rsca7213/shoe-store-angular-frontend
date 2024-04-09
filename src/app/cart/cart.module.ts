import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartComponent } from './cart.component'
import { CartsRoutingModule } from './cart-routing.module'
import { AngularMaterialModule } from '../angular-material.module'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartsRoutingModule, AngularMaterialModule, SharedModule, RouterModule]
})
export class CartModule {}
