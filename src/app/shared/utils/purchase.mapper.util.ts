import { Injectable } from '@angular/core'
import { GetAllPurchasesResponseDto } from '../dto/purchases/responses/get-all-purchases-dto.interface'
import { Purchase } from '../models/purchases.model'
import { GetAllPurchasesForUserResponseDto } from '../dto/purchases/responses/get-all-purchases-for-user-dto.interface'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class PurchasesMapper {
  public constructor(private readonly authService: AuthService) {}

  public mapGetAllPurchasesToModel(response: GetAllPurchasesResponseDto): Purchase[] {
    return response.purchases.map(p => ({
      id: p.id,
      purchaseDate: new Date(p.purchaseDate),
      user: {
        ...p.user,
        role: 'User'
      },
      total: p.total,
      paymentCard: {
        ...p.paymentDetails,
        user: {
          ...p.user,
          role: 'User'
        }
      },
      items: p.items
    }))
  }

  public mapGetPurchasesForCurrentUserToModel(
    response: GetAllPurchasesForUserResponseDto
  ): Purchase[] {
    return response.purchases.map(p => ({
      id: p.id,
      purchaseDate: new Date(p.purchaseDate),
      user: this.authService.authUser()!,
      total: p.total,
      paymentCard: {
        user: this.authService.authUser()!,
        ...p.paymentDetails
      },
      items: p.items
    }))
  }
}
