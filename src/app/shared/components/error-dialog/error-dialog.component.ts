import { Component } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ErrorDialogContentComponent } from './content/error-dialog-content.component'
import { APP_DIALOG_SIZES } from '../../constants/dialog-sizes.constant'

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  public constructor(private readonly dialog: MatDialog) {}

  public ref: MatDialogRef<ErrorDialogContentComponent>

  public open(message: string, details: string): void {
    this.dialog.open(ErrorDialogContentComponent, {
      data: { message, details },
      width: APP_DIALOG_SIZES.md
    })
  }

  public close(): void {
    this.ref.close()
  }
}
