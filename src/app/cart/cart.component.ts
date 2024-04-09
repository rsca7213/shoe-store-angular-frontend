import { Component, OnInit } from '@angular/core'
import { CartService } from '../shared/services/cart.service'
import { Product } from '../shared/models/product.model'
import { Cart } from '../shared/models/cart.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public cart: Cart
  public total: number

  public constructor(private readonly cartService: CartService) {}

  public ngOnInit(): void {
    this.getCart()
  }

  public getCart(): void {
    this.cart = this.cartService.getCart()
    this.calculateTotal()
  }

  public clearCart(): void {
    this.cartService.clearCart()
    this.getCart()
  }

  public calculateTotal(): void {
    this.total = this.cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeProduct(product)
    this.getCart()
  }

  public addToCart(product: Product): void {
    this.cartService.addProduct(product)
    this.getCart()
  }
}
