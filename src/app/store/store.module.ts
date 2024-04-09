import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreComponent } from './store.component'
import { AngularMaterialModule } from '../angular-material.module'
import { StoreRoutingModule } from './store-routing.module'
import { ProductCardComponent } from './components/product-card/product-card.component'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component'

@NgModule({
  declarations: [StoreComponent, ProductCardComponent, ProductDetailsDialogComponent],
  imports: [CommonModule, FormsModule, AngularMaterialModule, StoreRoutingModule, SharedModule]
})
export class StoreModule {}
