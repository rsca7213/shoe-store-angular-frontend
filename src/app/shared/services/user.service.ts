import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CreateUserRequestDto } from '../dto/users/requests/create-user-dto.interface'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'
import { UpdateUserRequestDto } from '../dto/users/requests/update-user-dto.interface'
import { GetUserResponseDto } from '../dto/users/responses/get-user-dto.interface'
import { GetAllUsersResponseDto } from '../dto/users/responses/get-all-users-dto.interface'
import { GetCurrentUserResponseDto } from '../dto/users/responses/get-current-user-dto.interface'
import { people, users } from './mock-data'
import { UpdateCurrentUserRequestDto } from '../dto/users/requests/update-current-user-dto.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private mockUsers = users
  private mockPeople = people

  public constructor(private readonly httpClient: HttpClient) {}

  public createUser(request: CreateUserRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const id = this.mockUsers.length + 1
        this.mockUsers.push({
          id,
          email: request.email,
          role: request.role
        })
        this.mockPeople.push({
          id,
          address: '',
          country: '',
          firstName: '',
          lastName: '',
          phoneNumber: ''
        })
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<void>(`${APP_PROPERTIES.api}/users`, request)
  }

  public updateUser(request: UpdateUserRequestDto, id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const userIndex = this.mockUsers.findIndex(user => user.id === id)
        this.mockUsers[userIndex] = { ...this.mockUsers[userIndex], ...request }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`${APP_PROPERTIES.api}/users/${id}`, request)
  }

  public deleteUser(id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockUsers = this.mockUsers.filter(user => user.id !== id)
        this.mockPeople = this.mockPeople.filter(person => person.id !== id)
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.delete<void>(`${APP_PROPERTIES.api}/users/${id}`)
  }

  public getUserById(id: number): Observable<GetUserResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockUsers.find(user => user.id === id))
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetUserResponseDto>(`${APP_PROPERTIES.api}/users/${id}`)
  }

  public getAllUsers(): Observable<GetAllUsersResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ users: this.mockUsers })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllUsersResponseDto>(`${APP_PROPERTIES.api}/users`)
  }

  public updateCurrentUser(request: UpdateCurrentUserRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const userIndex = this.mockUsers.findIndex(user => user.id === 1)
        this.mockUsers[userIndex] = { ...this.mockUsers[userIndex], ...request }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`${APP_PROPERTIES.api}/users/user`, request)
  }

  public getCurrentAuthenticatedUser(): Observable<GetCurrentUserResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockUsers[0])
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetCurrentUserResponseDto>(`${APP_PROPERTIES.api}/users/user`)
  }

  public determinePasswordStrength(password: string): number {
    let strength: number = 0

    // if password length is more or equal than 10
    if (password.length > 10) strength += 20

    // if password has lowercase letters
    if (password.match(/[a-z]/)) strength += 20

    // if password has uppercase letters
    if (password.match(/[A-Z]/)) strength += 20

    // if password has numbers
    if (password.match(/[0-9]/)) strength += 20

    // if password has special characters
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20

    return strength
  }
}
