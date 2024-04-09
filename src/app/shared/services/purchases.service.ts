import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CreatePurchaseRequestDto } from '../dto/purchases/requests/create-purchase-dto.interface'
import { Observable } from 'rxjs'
import { GetAllPurchasesResponseDto } from '../dto/purchases/responses/get-all-purchases-dto.interface'
import { GetAllPurchasesForUserResponseDto } from '../dto/purchases/responses/get-all-purchases-for-user-dto.interface'
import { paymentCards, products, purchases, users } from './mock-data'

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private mockPurchases = purchases
  private mockPaymentCards = paymentCards
  private mockUsers = users
  private mockProducts = products

  public constructor(private readonly httpClient: HttpClient) {}

  public createPurchase(request: CreatePurchaseRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const id = this.mockPurchases.length + 1
        const paymentCard = this.mockPaymentCards.find(
          pc => pc.number === request.paymentDetails.number
        )!
        this.mockPurchases.push({
          id,
          total: request.total,
          purchaseDate: new Date(),
          paymentCard,
          user: this.mockUsers[0],
          items: request.products.map(i => {
            return {
              product: this.mockProducts.find(p => p.id === i.id)!,
              quantity: i.quantity
            }
          })
        })
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<void>(`http://localhost:3000/purchases`, request)
  }

  public deletePurchase(id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockPurchases = this.mockPurchases.filter(purchase => purchase.id !== id)
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.delete<void>(`http://localhost:3000/purchases/${id}`)
  }

  public getAllPurchasesForCurrentUser(): Observable<GetAllPurchasesForUserResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          purchases: this.mockPurchases
            .filter(purchase => purchase.user.id === this.mockUsers[0].id)
            .map(p => {
              return {
                id: p.id,
                purchaseDate: p.purchaseDate,
                total: p.total,
                paymentDetails: p.paymentCard,
                items: p.items
              }
            })
        })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllPurchasesForUserResponseDto>(
      `http://localhost:3000/purchases/user`
    )
  }

  public getAllPurchases(): Observable<GetAllPurchasesResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          purchases: this.mockPurchases.map(purchase => {
            return {
              id: purchase.id,
              purchaseDate: purchase.purchaseDate,
              total: purchase.total,
              paymentDetails: purchase.paymentCard,
              items: purchase.items,
              user: purchase.user
            }
          })
        })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllPurchasesResponseDto>(`http://localhost:3000/purchases`)
  }
}
