import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductsComponent } from './products.component'
import { ProductsRoutingModule } from './products-routing.module'
import { AngularMaterialModule } from '../angular-material.module'
import { SharedModule } from '../shared/shared.module'
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component'
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component'
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductDialogComponent,
    UpdateProductDialogComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class ProductsModule {}
