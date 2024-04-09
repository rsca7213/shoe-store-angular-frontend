import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardsRoutingModule } from './cards-routing.module'
import { CardsComponent } from './cards.component'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { PaymentCardComponent } from './components/payment-card/payment-card.component'
import { CreatePaymentCardDialogComponent } from './components/create-payment-card-dialog/create-payment-card-dialog.component'
import { UpdatePaymentCardDialogComponent } from './components/update-payment-card-dialog/update-payment-card-dialog.component'
import { DeletePaymentCardDialogComponent } from './components/delete-payment-card-dialog/delete-payment-card-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    CardsComponent,
    PaymentCardComponent,
    CreatePaymentCardDialogComponent,
    UpdatePaymentCardDialogComponent,
    DeletePaymentCardDialogComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [PaymentCardComponent]
})
export class CardsModule {}
