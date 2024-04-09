import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Product } from '../../../shared/models/product.model'
import { CartService } from '../../../shared/services/cart.service'

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrl: './product-details-dialog.component.scss'
})
export class ProductDetailsDialogComponent {
  public addedToCartIndicator = false

  public constructor(
    private readonly dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly product: Product,
    private readonly cartService: CartService
  ) {}

  public addToCart(): void {
    this.addedToCartIndicator = true
    this.cartService.addProduct(this.product)

    setTimeout(() => {
      this.addedToCartIndicator = false
    }, 500)
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
