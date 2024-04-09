import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManagePurchasesComponent } from './manage-purchases.component'

const routes: Routes = [
  {
    path: '',
    component: ManagePurchasesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePurchasesRoutingModule {}
