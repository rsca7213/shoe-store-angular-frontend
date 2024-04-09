import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss'
})
export class CreateProductDialogComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl(<string>'', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    brand: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    color: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    category: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(1000000)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500)
    ]),
    imageUrl: new FormControl<string>('', [Validators.required])
  })

  public constructor(private readonly dialogRef: MatDialogRef<CreateProductDialogComponent>) {}

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public addProduct(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.form.get('price')?.setValue(Number(this.form.get('price')?.value))
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
    this.form.get('price')?.setValue(0)
  }
}
