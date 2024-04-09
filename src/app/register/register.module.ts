import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register-routing.module'
import { AngularMaterialModule } from '../angular-material.module'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule {}
