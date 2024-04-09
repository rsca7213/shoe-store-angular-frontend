import { Component } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { LoadingDialogContentComponent } from './content/loading-dialog-content.component'
import { APP_DIALOG_SIZES } from '../../constants/dialog-sizes.constant'

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.scss'
})
export class LoadingDialogComponent {
  public constructor(private readonly dialog: MatDialog) {}

  private ref: MatDialogRef<LoadingDialogContentComponent>

  public open(): void {
    this.ref = this.dialog.open(LoadingDialogContentComponent, {
      width: APP_DIALOG_SIZES.md,
      disableClose: true
    })
  }

  public close(): void {
    this.ref.close()
  }
}
