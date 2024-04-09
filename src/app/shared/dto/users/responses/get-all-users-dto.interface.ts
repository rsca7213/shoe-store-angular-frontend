import { UserRole } from '../../../types/users/user-role.type'

export interface GetAllUsersResponseDto {
  users: {
    id: number
    email: string
    role: UserRole
  }[]
}
