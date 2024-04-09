import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from '../../../shared/models/product.model'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() public product: Product
  @Input() public addedToCartIndicator: boolean
  @Output() public addToCart = new EventEmitter<void>()
  @Output() public viewProduct = new EventEmitter<void>()
}
