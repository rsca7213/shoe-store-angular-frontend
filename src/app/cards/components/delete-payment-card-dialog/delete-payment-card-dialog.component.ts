import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { PaymentCard } from '../../../shared/models/payment-card.model'
import { PaymentCardsService } from '../../../shared/services/payment-cards.service'

@Component({
  selector: 'app-delete-payment-card-dialog',
  templateUrl: './delete-payment-card-dialog.component.html',
  styleUrl: './delete-payment-card-dialog.component.scss'
})
export class DeletePaymentCardDialogComponent implements OnInit {
  public brand: string
  public brandUrl: string

  public constructor(
    private readonly dialogRef: MatDialogRef<DeletePaymentCardDialogComponent>,
    private readonly cardsService: PaymentCardsService,
    @Inject(MAT_DIALOG_DATA)
    public readonly card: PaymentCard
  ) {}

  public ngOnInit(): void {
    this.brand = this.cardsService.getCardBrandByNumber(this.card.number).brand
    this.brandUrl = this.cardsService.getCardBrandByNumber(this.card.number).url
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }

  public deleteCard(): void {
    this.dialogRef.close(this.card)
  }
}
