import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { User } from '../../../shared/models/user.model'
import { Person } from '../../../shared/models/person.model'

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { user: User; profile: Person }
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }

  public deleteUser(): void {
    this.dialogRef.close(this.data)
  }
}
