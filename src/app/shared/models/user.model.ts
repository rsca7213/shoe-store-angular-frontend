import { UserRole } from '../types/users/user-role.type'

export interface User {
  id: number
  email: string
  passwordHash?: string
  role: UserRole
}
