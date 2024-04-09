import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-loading-dialog-content',
  templateUrl: './loading-dialog-content.component.html',
  styleUrl: './loading-dialog-content.component.scss'
})
export class LoadingDialogContentComponent {
  public constructor(private readonly dialogRef: MatDialogRef<LoadingDialogContentComponent>) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
