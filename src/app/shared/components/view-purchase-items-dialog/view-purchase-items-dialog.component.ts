import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Purchase } from '../../models/purchases.model'

@Component({
  selector: 'app-view-purchase-items-dialog',
  templateUrl: './view-purchase-items-dialog.component.html',
  styleUrl: './view-purchase-items-dialog.component.scss'
})
export class ViewPurchaseItemsDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<ViewPurchaseItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly purchase: Purchase
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
