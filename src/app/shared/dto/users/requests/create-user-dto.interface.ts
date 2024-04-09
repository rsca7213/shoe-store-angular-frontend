import { UserRole } from '../../../types/users/user-role.type'

export interface CreateUserRequestDto {
  email: string
  password: string
  role: UserRole
}
