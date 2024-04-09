import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PaymentCard } from '../../../shared/models/payment-card.model'
import { PaymentCardsService } from '../../../shared/services/payment-cards.service'

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.scss'
})
export class PaymentCardComponent implements OnInit {
  @Input() public card: PaymentCard
  @Input() public enableActions: boolean

  @Output() public delete: EventEmitter<void> = new EventEmitter<void>()
  @Output() public update: EventEmitter<void> = new EventEmitter<void>()

  public brand: string
  public brandUrl: string
  public brandBackground: string

  public constructor(private readonly cardsService: PaymentCardsService) {}

  public ngOnInit(): void {
    const cardBrand = this.cardsService.getCardBrandByNumber(this.card.number)

    this.brand = cardBrand.brand
    this.brandUrl = cardBrand.url
    this.brandBackground = cardBrand.backgroundColor
  }

  public deleteCard(): void {
    this.delete.emit()
  }

  public updateCard(): void {
    this.update.emit()
  }
}
