import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { UpdateCurrentUserDialogComponent } from './components/update-current-user-dialog/update-current-user-dialog.component'
import { UpdateCurrentProfileDialogComponent } from './components/update-current-profile-dialog/update-current-profile-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateCurrentUserDialogComponent,
    UpdateCurrentProfileDialogComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {}
