import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { PaymentCardsService } from '../shared/services/payment-cards.service'
import { PaymentCard } from '../shared/models/payment-card.model'
import { CardsMapper } from '../shared/utils/card.mapper.util'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { CreatePaymentCardDialogComponent } from './components/create-payment-card-dialog/create-payment-card-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { finalize } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { UpdatePaymentCardDialogComponent } from './components/update-payment-card-dialog/update-payment-card-dialog.component'
import { DeletePaymentCardDialogComponent } from './components/delete-payment-card-dialog/delete-payment-card-dialog.component'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  public viewState: LoadingState = 'loading'
  public cards: PaymentCard[]

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly cardsService: PaymentCardsService,
    private readonly cardsMapper: CardsMapper,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getCards()
  }

  public getCards(): void {
    this.viewState = 'loading'
    this.cardsService.getAllPaymentCardsForCurrentUser().subscribe({
      next: data => {
        this.cards = this.cardsMapper.mapGetAllPaymentCardsForUserToModel(data)
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public addCard(): void {
    const ref = this.dialog.open(CreatePaymentCardDialogComponent, {
      width: APP_DIALOG_SIZES.md
    })

    ref.afterClosed().subscribe((card: PaymentCard) => {
      if (!card) return

      this.loadingDialog.open()
      this.cardsService
        .createPaymentCard(card)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.getCards()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al crear la tarjeta', err.message)
          }
        })
    })
  }

  public updateCard(card: PaymentCard): void {
    const ref = this.dialog.open(UpdatePaymentCardDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: card
    })

    ref.afterClosed().subscribe((updatedCard: PaymentCard) => {
      if (!updatedCard) return

      this.loadingDialog.open()
      this.cardsService
        .updatePaymentCard(updatedCard, card.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            card.cardholder = updatedCard.cardholder
            card.number = updatedCard.number
            card.expiration = updatedCard.expiration
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al actualizar la tarjeta', err.message)
          }
        })
    })
  }

  public deleteCard(card: PaymentCard): void {
    const ref = this.dialog.open(DeletePaymentCardDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: card
    })

    ref.afterClosed().subscribe((card: PaymentCard) => {
      if (!card) return

      this.loadingDialog.open()
      this.cardsService
        .deletePaymentCard(card.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.cards = this.cards.filter(c => c.id !== card.id)
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al eliminar la tarjeta', err.message)
          }
        })
    })
  }
}
