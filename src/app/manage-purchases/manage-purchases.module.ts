import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagePurchasesRoutingModule } from './manage-purchases-routing.module'
import { ManagePurchasesComponent } from './manage-purchases.component'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { DeletePurchaseDialogComponent } from './components/delete-purchase-dialog/delete-purchase-dialog.component'

@NgModule({
  declarations: [ManagePurchasesComponent, DeletePurchaseDialogComponent],
  imports: [CommonModule, ManagePurchasesRoutingModule, SharedModule, AngularMaterialModule]
})
export class ManagePurchasesModule {}
