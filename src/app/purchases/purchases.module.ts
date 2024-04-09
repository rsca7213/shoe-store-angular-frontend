import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PurchasesComponent } from './purchases.component'
import { PurchasesRoutingModule } from './purchases-routing.module'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'

@NgModule({
  declarations: [PurchasesComponent],
  imports: [CommonModule, PurchasesRoutingModule, SharedModule, AngularMaterialModule]
})
export class PurchasesModule {}
