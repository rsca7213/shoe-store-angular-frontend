import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { PeopleService } from '../shared/services/people.service'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { Person } from '../shared/models/person.model'
import { PeopleMapper } from '../shared/utils/people.mapper.util'
import { User } from '../shared/models/user.model'
import { finalize, forkJoin } from 'rxjs'
import { UsersService } from '../shared/services/user.service'
import { UsersMapper } from '../shared/utils/user.mapper.util'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { UpdateCurrentProfileDialogComponent } from './components/update-current-profile-dialog/update-current-profile-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { UpdateCurrentUserDialogComponent } from './components/update-current-user-dialog/update-current-user-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { countries, Country } from '../shared/constants/countries.constant'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public profile: Person
  public user: User
  public viewState: LoadingState = 'loading'
  public countries: Country[] = countries

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly peopleService: PeopleService,
    private readonly usersService: UsersService,
    private readonly peopleMapper: PeopleMapper,
    private readonly usersMapper: UsersMapper,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getData()
  }

  private getData(): void {
    this.viewState = 'loading'
    forkJoin([
      this.peopleService.getCurrentAuthenticatedPerson(),
      this.usersService.getCurrentAuthenticatedUser()
    ]).subscribe({
      next: ([person, user]) => {
        this.profile = this.peopleMapper.mapGetCurrentAuthenticatedPersonResponseDtoToModel(person)
        this.user = this.usersMapper.mapGetCurrentUserResonseDtoToModel(user)
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public editProfile(): void {
    const ref = this.dialog.open(UpdateCurrentProfileDialogComponent, {
      width: APP_DIALOG_SIZES.lg,
      data: this.profile
    })

    ref.afterClosed().subscribe((result: Person) => {
      if (!result) return

      this.loadingDialog.open()

      this.peopleService
        .updateCurrentAuthenticatedPerson(result)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.profile = result
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al actualizar el perfil', err.message)
          }
        })
    })
  }

  public editUser(): void {
    const ref = this.dialog.open(UpdateCurrentUserDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: this.user
    })

    ref.afterClosed().subscribe((result: { email: string; password: string }) => {
      if (!result) return

      this.loadingDialog.open()

      this.usersService
        .updateCurrentUser(result)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.user.email = result.email
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al actualizar el usuario', err.message)
          }
        })
    })
  }
}
