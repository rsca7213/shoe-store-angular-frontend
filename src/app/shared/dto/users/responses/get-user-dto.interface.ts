import { UserRole } from '../../../types/users/user-role.type'

export interface GetUserResponseDto {
  id: number
  email: string
  role: UserRole
}
