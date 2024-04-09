import { Component, Inject, OnInit } from '@angular/core'
import { Product } from '../../../shared/models/product.model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.scss'
})
export class UpdateProductDialogComponent implements OnInit {
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

  public constructor(
    private readonly dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly product: Product
  ) {}

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public updateProduct(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.form.get('price')?.setValue(Number(this.form.get('price')?.value))
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()

    this.form.get('name')?.setValue(this.product.name)
    this.form.get('brand')?.setValue(this.product.brand)
    this.form.get('color')?.setValue(this.product.color)
    this.form.get('category')?.setValue(this.product.category)
    this.form.get('price')?.setValue(this.product.price)
    this.form.get('description')?.setValue(this.product.description)
    this.form.get('imageUrl')?.setValue(this.product.imageUrl)
  }

  public ngOnInit(): void {
    this.resetForm()
  }
}
