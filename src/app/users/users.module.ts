import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UsersRoutingModule } from './users-routing.module'
import { UsersComponent } from './users.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularMaterialModule } from '../angular-material.module'
import { SharedModule } from '../shared/shared.module'
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component'
import { UpdateUserDialogComponent } from './components/update-user-dialog/update-user-dialog.component'
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component'

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserDialogComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class UsersModule {}
