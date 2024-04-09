import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CreatePaymentCardRequestDto } from '../dto/payment-cards/requests/create-payment-card-dto.interface'
import { UpdatePaymentCardRequestDto } from '../dto/payment-cards/requests/update-payment-card-dto.interface'
import { GetAllPaymentCardsForUserDto } from '../dto/payment-cards/responses/get-all-payment-cards-for-user-dto.interface'
import { paymentCards, users } from './mock-data'
import { cardTypesUrl } from '../constants/card-type-url.constant'

@Injectable({
  providedIn: 'root'
})
export class PaymentCardsService {
  private mockPaymentCards = paymentCards
  private mockUsers = users

  public constructor(private readonly httpClient: HttpClient) {}

  public createPaymentCard(request: CreatePaymentCardRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const id = this.mockPaymentCards.length + 1
        this.mockPaymentCards.push({
          id,
          ...request,
          user: users[0]
        })
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<void>(`http://localhost:3000/cards`, request)
  }

  public updatePaymentCard(request: UpdatePaymentCardRequestDto, id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const paymentCardIndex = this.mockPaymentCards.findIndex(
          paymentCard => paymentCard.id === id
        )
        this.mockPaymentCards[paymentCardIndex] = {
          ...this.mockPaymentCards[paymentCardIndex],
          ...request
        }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`http://localhost:3000/cards/${id}`, request)
  }

  public deletePaymentCard(id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockPaymentCards = this.mockPaymentCards.filter(paymentCard => paymentCard.id !== id)
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.delete<void>(`http://localhost:3000/cards/${id}`)
  }

  public getAllPaymentCardsForCurrentUser(): Observable<GetAllPaymentCardsForUserDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          cards: this.mockPaymentCards.filter(
            paymentCard => paymentCard.user.id === this.mockUsers[0].id
          )
        })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllPaymentCardsForUserDto>(`http://localhost:3000/cards/user`)
  }

  public getCardBrandByNumber(number: string): {
    brand: string
    url: string
    backgroundColor: string
  } {
    const firstDigit = number[0]
    if (firstDigit === '4')
      return {
        brand: 'Visa',
        url: cardTypesUrl.visa,
        backgroundColor: '#0c33d810'
      }
    if (firstDigit === '5')
      return {
        brand: 'Mastercard',
        url: cardTypesUrl.mastercard,
        backgroundColor: '#f79e1310'
      }
    if (firstDigit === '3')
      return {
        brand: 'American Express',
        url: cardTypesUrl.amex,
        backgroundColor: '#0070d110'
      }
    return {
      brand: 'Unknown',
      url: cardTypesUrl.default,
      backgroundColor: '#ffffff'
    }
  }
}
