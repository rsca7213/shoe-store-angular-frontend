import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GetAllPeopleResponseDto } from '../dto/people/responses/get-all-people-dto.interface'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'
import { GetPersonResponseDto } from '../dto/people/responses/get-person-dto.interface'
import { UpdatePersonRequestDto } from '../dto/people/requests/update-person-dto.interface'
import { people } from './mock-data'
import { GetCurrentPersonResponseDto } from '../dto/people/responses/get-current-person-dto.interface'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private mockPersons = people

  public constructor(private readonly httpClient: HttpClient) {}

  public getAllPeople(): Observable<GetAllPeopleResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          people
        })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllPeopleResponseDto>(`${APP_PROPERTIES.api}/people`)
  }

  public getPersonById(id: number): Observable<GetPersonResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockPersons.find(person => person.id === id))
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetPersonResponseDto>(`${APP_PROPERTIES.api}/people/${id}`)
  }

  public updatePerson(request: UpdatePersonRequestDto, id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const personIndex = this.mockPersons.findIndex(person => person.id === id)
        this.mockPersons[personIndex] = { ...this.mockPersons[personIndex], ...request }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`${APP_PROPERTIES.api}/people/${id}`, request)
  }

  public updateCurrentAuthenticatedPerson(request: UpdatePersonRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockPersons[0] = { ...this.mockPersons[0], ...request }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`${APP_PROPERTIES.api}/people/user`, request)
  }

  public getCurrentAuthenticatedPerson(): Observable<GetCurrentPersonResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockPersons[0])
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetCurrentPersonResponseDto>(`${APP_PROPERTIES.api}/people/person`)
  }
}
