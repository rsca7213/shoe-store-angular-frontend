import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { CustomValidators } from '../../../shared/validators/validations.class'
import { UserRole } from '../../../shared/types/users/user-role.type'
import { userRoles } from '../../../shared/constants/user-roles.constant'
import { countries, Country } from '../../../shared/constants/countries.constant'

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(320)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      CustomValidators.hasLowercase(),
      CustomValidators.hasUppercase(),
      CustomValidators.hasNumber(),
      CustomValidators.hasSpecialCharacter()
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
    role: new FormControl<UserRole>('User', [Validators.required]),
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    country: new FormControl<Country | null>(null, [Validators.required]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      CustomValidators.phoneNumberWithAreaCode()
    ]),
    address: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ])
  })

  public userRoles = userRoles.map(role => {
    const label = role === 'Admin' ? 'Administrator' : 'Usuario común'
    return { value: role, label }
  })

  public readonly countries = countries

  public passwordInputType: string = 'password'

  public constructor(private readonly dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

  public ngOnInit(): void {
    this.startPasswordMatchValidation()
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public addUser(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close({
      user: {
        email: this.form.get('email')!.value,
        role: this.form.get('role')!.value
      },
      profile: {
        firstName: this.form.get('firstName')!.value,
        lastName: this.form.get('lastName')!.value,
        phoneNumber: this.form.get('phoneNumber')!.value,
        country: this.form.get('country')!.value.name,
        address: this.form.get('address')!.value
      },
      password: this.form.get('password')!.value
    })

    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
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

  public selectCountry(): void {
    const areaCode = this.form.get('country')?.value?.areaCode
    if (!areaCode) return
    this.form.get('phoneNumber')?.setValue(`(+${areaCode}) `)
  }
}
