import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Purchase } from '../../../shared/models/purchases.model'

@Component({
  selector: 'app-delete-purchase-dialog',
  templateUrl: './delete-purchase-dialog.component.html',
  styleUrl: './delete-purchase-dialog.component.scss'
})
export class DeletePurchaseDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeletePurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly purchase: Purchase
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }

  public deletePurchase(): void {
    this.dialogRef.close(this.purchase)
  }
}
