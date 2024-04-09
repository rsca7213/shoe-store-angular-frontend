import { UserRole } from '../../../types/users/user-role.type'

export interface UpdateUserRequestDto {
  email: string
  password?: string
  role: UserRole
}
