import { Component, ViewChild } from '@angular/core'
import { APP_PROPERTIES } from '../../properties'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../shared/validators/validations.class'
import { AuthService } from '../shared/services/auth.service'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { finalize } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
    ])
  })

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'

  public constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
  }

  public login(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.loadingDialog.open()
    this.authService
      .login(this.form.value)
      .pipe(finalize(() => this.loadingDialog.close()))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/store')
        },
        error: (err: ApiError) => {
          this.errorDialog.open('Ocurrió un error al iniciar sesión', err.message)
        }
      })
  }
}
