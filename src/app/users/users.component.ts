import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingState } from '../shared/types/loading-state.types'
import { User } from '../shared/models/user.model'
import { UsersService } from '../shared/services/user.service'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { PageEvent } from '@angular/material/paginator'
import { UsersMapper } from '../shared/utils/user.mapper.util'
import { Person } from '../shared/models/person.model'
import { finalize, forkJoin, lastValueFrom } from 'rxjs'
import { PeopleService } from '../shared/services/people.service'
import { PeopleMapper } from '../shared/utils/people.mapper.util'
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component'
import { UpdateUserDialogComponent } from './components/update-user-dialog/update-user-dialog.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: User[]
  public profiles: Person[]
  public tableUsers: {
    user: User
    profile: Person
  }[]
  public displayedColumns: string[] = ['name', 'email', 'phone', 'country', 'role', 'actions']

  public viewState: LoadingState = 'loading'
  public pageSize: number = 10
  public pageIndex: number = 0

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly usersService: UsersService,
    private readonly usersMapper: UsersMapper,
    private readonly peopleService: PeopleService,
    private readonly peopleMapper: PeopleMapper,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getUsers()
  }

  public getUsers(): void {
    this.viewState = 'loading'
    forkJoin([this.usersService.getAllUsers(), this.peopleService.getAllPeople()]).subscribe({
      next: ([users, people]) => {
        this.users = this.usersMapper.mapGetAllUsersResponseDtoToModel(users)
        this.profiles = this.peopleMapper.mapGetAllPeopleResponseDtoToModel(people)
        this.tableUsers = this.users.map(user => {
          const profile = this.profiles.find(profile => profile.id === user.id)!
          return { user, profile }
        })
        this.renderUserPagination()
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public addUser(): void {
    const ref = this.dialog.open(CreateUserDialogComponent, {
      width: APP_DIALOG_SIZES.lg
    })

    ref.afterClosed().subscribe((data: { user: User; profile: Person; password: string }) => {
      if (!data) return

      this.loadingDialog.open()

      this.usersService
        .createUser({
          email: data.user.email,
          password: data.password,
          role: data.user.role
        })
        .subscribe({
          next: async () => {
            const users = await lastValueFrom(this.usersService.getAllUsers())
            const createdUser = users.users.find(user => user.email === data.user.email)!

            if (!createdUser) {
              this.errorDialog.open(
                'Ocurrio un error al crear el usuario',
                'No se pudo encontrar el usuario creado'
              )
              this.loadingDialog.close()
              return
            }

            this.peopleService
              .updatePerson(data.profile, createdUser.id)
              .pipe(finalize(() => this.loadingDialog.close()))
              .subscribe({
                next: () => {
                  this.getUsers()
                },
                error: err => {
                  this.errorDialog.open('Ocurrio un error al actualizar el perfil', err.message)
                }
              })
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al crear el usuario', err.message)
            this.loadingDialog.close()
          }
        })
    })
  }

  public editUser(data: { user: User; profile: Person }): void {
    const ref = this.dialog.open(UpdateUserDialogComponent, {
      width: APP_DIALOG_SIZES.lg,
      data: { user: data.user, profile: data.profile }
    })

    const userId = data.user.id

    ref.afterClosed().subscribe((data: { user: User; profile: Person; password: string }) => {
      if (!data) return

      this.loadingDialog.open()

      this.usersService
        .updateUser(
          {
            email: data.user.email,
            role: data.user.role,
            password: data.password
          },
          userId
        )
        .subscribe({
          next: () => {
            this.peopleService
              .updatePerson(data.profile, userId)
              .pipe(finalize(() => this.loadingDialog.close()))
              .subscribe({
                next: () => {
                  const user = this.users.find(user => user.id === userId)!
                  const profile = this.profiles.find(profile => profile.id === userId)!

                  user.email = data.user.email
                  user.role = data.user.role
                  profile.firstName = data.profile.firstName
                  profile.lastName = data.profile.lastName
                  profile.phoneNumber = data.profile.phoneNumber
                  profile.country = data.profile.country
                  profile.address = data.profile.address
                },
                error: err => {
                  this.errorDialog.open('Ocurrio un error al actualizar el perfil', err.message)
                  this.loadingDialog.close()
                }
              })
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al actualizar el usuario', err.message)
            this.loadingDialog.close()
          }
        })
    })
  }

  public deleteUser(data: { user: User; profile: Person }): void {
    const ref = this.dialog.open(DeleteUserDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: { user: data.user, profile: data.profile }
    })

    ref.afterClosed().subscribe((data: { user: User; profile: Person }) => {
      if (!data) return

      this.loadingDialog.open()

      this.usersService
        .deleteUser(data.user.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== data.user.id)
            this.profiles = this.profiles.filter(profile => profile.id !== data.user.id)
            this.renderUserPagination()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al eliminar el producto', err.message)
          }
        })
    })
  }

  public renderUserPagination(): void {
    const startIndex = this.pageIndex * this.pageSize
    const endIndex = startIndex + this.pageSize

    const users = this.users.slice(startIndex, endIndex)
    const profiles = users.map(user => this.profiles.find(profile => profile.id === user.id)!)

    this.tableUsers = users.map((user, index) => ({
      user,
      profile: profiles[index]
    }))
  }

  public selectPage(event: PageEvent): void {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
  }
}
