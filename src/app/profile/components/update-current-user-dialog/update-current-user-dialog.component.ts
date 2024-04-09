import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { User } from '../../../shared/models/user.model'
import { CustomValidators } from '../../../shared/validators/validations.class'

@Component({
  selector: 'app-update-current-user-dialog',
  templateUrl: './update-current-user-dialog.component.html',
  styleUrl: './update-current-user-dialog.component.scss'
})
export class UpdateCurrentUserDialogComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(320)
    ]),
    updatePassword: new FormControl<boolean>(false),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      CustomValidators.hasLowercase(),
      CustomValidators.hasUppercase(),
      CustomValidators.hasNumber(),
      CustomValidators.hasSpecialCharacter()
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required])
  })

  public passwordInputType: string = 'password'

  public constructor(
    private readonly dialogRef: MatDialogRef<UpdateCurrentUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly user: User
  ) {}

  public ngOnInit(): void {
    this.form.patchValue({
      email: this.user.email
    })

    this.togglePasswordUpdate()
    this.startPasswordMatchValidation()
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public editUser(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close({
      email: this.form.get('email')!.value,
      password: this.form.get('updatePassword')!.value
        ? this.form.get('password')!.value
        : undefined
    })
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
  }

  public togglePasswordUpdate(): void {
    const updatePassword: boolean = this.form.get('updatePassword')!.value
    this.form.get('password')!.reset()
    this.form.get('confirmPassword')!.reset()

    if (!updatePassword) {
      this.form.get('password')!.disable()
      this.form.get('confirmPassword')!.disable()
    } else {
      this.form.get('password')!.enable()
      this.form.get('confirmPassword')!.enable()
    }
  }

  public togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
  }

  public passwordMatchValidation(): void {
    if (this.form.get('password')!.value === this.form.get('confirmPassword')!.value) return

    this.form.get('confirmPassword')!.setErrors({ passwordMatch: true })
  }

  public startPasswordMatchValidation(): void {
    this.form.get('confirmPassword')!.valueChanges.subscribe(() => this.passwordMatchValidation())
  }
}
