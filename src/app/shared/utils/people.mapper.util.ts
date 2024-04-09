import { Injectable } from '@angular/core'
import { Person } from '../models/person.model'
import { GetAllPeopleResponseDto } from '../dto/people/responses/get-all-people-dto.interface'
import { GetCurrentPersonResponseDto } from '../dto/people/responses/get-current-person-dto.interface'

@Injectable({
  providedIn: 'root'
})
export class PeopleMapper {
  public mapGetAllPeopleResponseDtoToModel(response: GetAllPeopleResponseDto): Person[] {
    return response.people.map(p => ({
      id: p.id,
      address: p.address,
      country: p.country,
      firstName: p.firstName,
      lastName: p.lastName,
      phoneNumber: p.phoneNumber
    }))
  }

  public mapGetCurrentAuthenticatedPersonResponseDtoToModel(
    response: GetCurrentPersonResponseDto
  ): Person {
    return {
      id: response.id,
      address: response.address,
      country: response.country,
      firstName: response.firstName,
      lastName: response.lastName,
      phoneNumber: response.phoneNumber
    }
  }
}
