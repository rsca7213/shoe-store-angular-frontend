import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaymentComponent } from './payment.component'
import { PaymentRoutingModule } from './payment-routing.module'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { CardsModule } from '../cards/cards.module'

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    CardsModule
  ]
})
export class PaymentModule {}
