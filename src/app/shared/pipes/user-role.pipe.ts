import { Pipe, PipeTransform } from '@angular/core'
import { UserRole } from '../types/users/user-role.type'

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  public transform(role: UserRole): unknown {
    return role === 'Admin' ? 'Administrator' : 'Usuario común'
  }
}
