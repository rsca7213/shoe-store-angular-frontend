import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../../../shared/validators/validations.class'
import { MatDialogRef } from '@angular/material/dialog'
import { PaymentCardsService } from '../../../shared/services/payment-cards.service'

@Component({
  selector: 'app-create-payment-card-dialog',
  templateUrl: './create-payment-card-dialog.component.html',
  styleUrl: './create-payment-card-dialog.component.scss'
})
export class CreatePaymentCardDialogComponent {
  public form: FormGroup = new FormGroup({
    cardholder: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      CustomValidators.onlyLettersAndSpaces()
    ]),
    number: new FormControl<string>('', [Validators.required, CustomValidators.cardNumber()]),
    expiration: new FormControl<string>('', [
      Validators.required,
      CustomValidators.cardExpiration()
    ])
  })

  public cardImageUrl: string = ''

  public constructor(
    private readonly dialogRef: MatDialogRef<CreatePaymentCardDialogComponent>,
    private readonly cardsService: PaymentCardsService
  ) {}

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public addCard(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  public detectCardType(): void {
    const cardNumber = this.form.get('number')?.value
    this.cardImageUrl = this.cardsService.getCardBrandByNumber(cardNumber).url
  }

  private resetForm(): void {
    this.form.reset()
  }
}
