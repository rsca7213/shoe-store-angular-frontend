import { UserRole } from '../../../types/users/user-role.type'

export interface GetCurrentUserResponseDto {
  id: number
  email: string
  role: UserRole
}
