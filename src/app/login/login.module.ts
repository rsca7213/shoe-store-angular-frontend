import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { LoginRoutingModule } from './login-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule {}
