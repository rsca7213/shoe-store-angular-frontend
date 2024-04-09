import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Person } from '../../../shared/models/person.model'
import { countries, Country } from '../../../shared/constants/countries.constant'
import { CustomValidators } from '../../../shared/validators/validations.class'

@Component({
  selector: 'app-update-current-profile-dialog',
  templateUrl: './update-current-profile-dialog.component.html',
  styleUrl: './update-current-profile-dialog.component.scss'
})
export class UpdateCurrentProfileDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    country: new FormControl<Country | null>(null, [Validators.required]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      CustomValidators.phoneNumberWithAreaCode()
    ]),
    address: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ])
  })

  public readonly countries = countries

  public constructor(
    private readonly dialogRef: MatDialogRef<UpdateCurrentProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly profile: Person
  ) {}

  public ngOnInit(): void {
    this.form.patchValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      country: this.countries.find(country => country.name === this.profile.country),
      phoneNumber: this.profile.phoneNumber,
      address: this.profile.address
    })
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public editProfile(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close({
      ...this.form.value,
      country: this.form.get('country')!.value.name
    })
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
  }

  public selectCountry(): void {
    const areaCode = this.form.get('country')?.value?.areaCode
    if (!areaCode) return
    this.form.get('phoneNumber')?.setValue(`(+${areaCode}) `)
  }
}
