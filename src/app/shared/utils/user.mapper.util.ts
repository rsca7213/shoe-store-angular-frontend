import { Injectable } from '@angular/core'
import { GetAllUsersResponseDto } from '../dto/users/responses/get-all-users-dto.interface'
import { User } from '../models/user.model'
import { GetCurrentUserResponseDto } from '../dto/users/responses/get-current-user-dto.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersMapper {
  public mapGetAllUsersResponseDtoToModel(response: GetAllUsersResponseDto): User[] {
    return response.users.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role
    }))
  }

  public mapGetCurrentUserResonseDtoToModel(response: GetCurrentUserResponseDto): User {
    return {
      id: response.id,
      email: response.email,
      role: response.role
    }
  }
}
