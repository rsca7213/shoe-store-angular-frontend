import { Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { APP_PROPERTIES } from '../../properties'
import { CustomValidators } from '../shared/validators/validations.class'
import { UsersService } from '../shared/services/user.service'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { AuthService } from '../shared/services/auth.service'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { Router } from '@angular/router'
import { finalize } from 'rxjs'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'
  public passwordStrength: number = 0

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
    confirmPassword: new FormControl<string>('', [Validators.required])
  })

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

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

  public determinePasswordStrength(): void {
    this.passwordStrength = this.userService.determinePasswordStrength(
      this.form.get('password')!.value
    )
  }

  public startPasswordStrengthValidation(): void {
    this.form.get('password')!.valueChanges.subscribe(() => this.determinePasswordStrength())
  }

  public ngOnInit(): void {
    this.startPasswordMatchValidation()
    this.startPasswordStrengthValidation()
  }

  public register(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.loadingDialog.open()

    this.authService
      .register(this.form.value)
      .pipe(finalize(() => this.loadingDialog.close()))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login')
        },
        error: (err: ApiError) => {
          this.errorDialog.open('Ocurrió un error al registrar el usuario', err.message)
        }
      })
  }
}
