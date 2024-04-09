import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Cart } from '../shared/models/cart.model'
import { CartService } from '../shared/services/cart.service'
import { PaymentCard } from '../shared/models/payment-card.model'
import { PaymentCardsService } from '../shared/services/payment-cards.service'
import { CardsMapper } from '../shared/utils/card.mapper.util'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingState } from '../shared/types/loading-state.types'
import { PurchasesService } from '../shared/services/purchases.service'
import { finalize } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  public cart: Cart
  public cards: PaymentCard[]
  public total: number

  public form: FormGroup = new FormGroup({
    card: new FormControl<PaymentCard | null>(null, [Validators.required]),
    cvv: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ])
  })

  public viewState: LoadingState = 'loading'

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly cartService: CartService,
    private readonly cardsService: PaymentCardsService,
    private readonly cardsMapper: CardsMapper,
    private readonly purchasesService: PurchasesService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.getCart()
    this.getCards()
  }

  public getCart(): void {
    this.cart = this.cartService.getCart()
    this.total = this.cartService.getTotal()
  }

  public getCards(): void {
    this.viewState = 'loading'
    this.cardsService.getAllPaymentCardsForCurrentUser().subscribe({
      next: cards => {
        this.cards = this.cardsMapper.mapGetAllPaymentCardsForUserToModel(cards)
        this.form.get('card')?.setValue(this.cards[0])
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public pay(): void {
    if (this.form.invalid) return

    const card: PaymentCard = this.form.get('card')!.value
    const cvv: string = this.form.get('cvv')!.value

    this.loadingDialog.open()

    this.purchasesService
      .createPurchase({
        paymentDetails: {
          ...card,
          cvv
        },
        total: this.total,
        products: this.cart.items.map(item => {
          return {
            id: item.product.id,
            quantity: item.quantity
          }
        })
      })
      .pipe(finalize(() => this.loadingDialog.close()))
      .subscribe({
        next: () => {
          this.cartService.clearCart()
          this.router.navigateByUrl('/purchases?success=true')
        },
        error: (err: ApiError) => {
          this.errorDialog.open('Ocurrio un error al realizar el pago', err.message)
          this.loadingDialog.close()
        }
      })
  }
}
