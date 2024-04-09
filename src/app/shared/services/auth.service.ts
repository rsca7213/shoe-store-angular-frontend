import { Injectable, signal } from '@angular/core'
import { LoginUserRequestDto } from '../dto/auth/requests/login-user-dto.interface'
import { Observable, tap } from 'rxjs'
import { LoginUserResponseDto } from '../dto/auth/responses/login-user-dto.interface'
import { HttpClient } from '@angular/common/http'
import { APP_PROPERTIES } from '../../../properties'
import { RegisterUserRequestDto } from '../dto/auth/requests/register-user-dto.interface'
import { users } from './mock-data'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers = users
  public authUser = signal<User | null>(this.mockUsers[0])

  public constructor(private readonly httpClient: HttpClient) {}

  public login(request: LoginUserRequestDto): Observable<LoginUserResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        const user = this.mockUsers.find(user => user.email === request.email)
        if (!user) {
          observer.error({
            status: 404,
            message: 'El usuario ingresado no se encuentra registrado en el sistema.'
          })
          return
        }
        observer.next({
          token: 'mock-token'
        })

        this.authUser.set(this.mockUsers.find(user => user.email === request.email)!)
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<LoginUserResponseDto>(`${APP_PROPERTIES.api}/auth/login`, request)
  }

  public register(request: RegisterUserRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const id = this.mockUsers.length + 1
        this.mockUsers.push({
          id,
          email: request.email,
          role: 'User'
        })
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<void>(`${APP_PROPERTIES.api}/auth/register`, request)
  }

  public logout(): void {
    this.authUser.set(null)
  }
}
