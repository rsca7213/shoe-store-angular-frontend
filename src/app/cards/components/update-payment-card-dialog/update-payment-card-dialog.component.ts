import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../../../shared/validators/validations.class'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { PaymentCardsService } from '../../../shared/services/payment-cards.service'
import { PaymentCard } from '../../../shared/models/payment-card.model'

@Component({
  selector: 'app-update-payment-card-dialog',
  templateUrl: './update-payment-card-dialog.component.html',
  styleUrl: './update-payment-card-dialog.component.scss'
})
export class UpdatePaymentCardDialogComponent implements OnInit {
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
    private readonly dialogRef: MatDialogRef<UpdatePaymentCardDialogComponent>,
    private readonly cardsService: PaymentCardsService,
    @Inject(MAT_DIALOG_DATA)
    public readonly card: PaymentCard
  ) {}

  public ngOnInit(): void {
    this.form.patchValue({
      cardholder: this.card.cardholder,
      expiration: this.card.expiration
    })
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public updateCard(): void {
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
