import { Injectable } from '@angular/core'
import { GetAllPaymentCardsForUserDto } from '../dto/payment-cards/responses/get-all-payment-cards-for-user-dto.interface'
import { PaymentCard } from '../models/payment-card.model'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class CardsMapper {
  public constructor(private readonly authService: AuthService) {}

  public mapGetAllPaymentCardsForUserToModel(
    response: GetAllPaymentCardsForUserDto
  ): PaymentCard[] {
    return response.cards.map(c => ({
      id: c.id,
      cardholder: c.cardholder,
      expiration: c.expiration,
      number: c.number,
      user: this.authService.authUser()!
    }))
  }
}
