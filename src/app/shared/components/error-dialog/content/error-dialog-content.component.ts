import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-error-dialog-content',
  templateUrl: './error-dialog-content.component.html',
  styleUrl: './error-dialog-content.component.scss'
})
export class ErrorDialogContentComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<ErrorDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      message: string
      details: string
    }
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
