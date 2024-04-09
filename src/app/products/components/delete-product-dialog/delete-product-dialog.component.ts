import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Product } from '../../../shared/models/product.model'

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss'
})
export class DeleteProductDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly product: Product
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }

  public deleteProduct(): void {
    this.dialogRef.close(this.product)
  }
}
