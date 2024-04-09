import { Injectable, signal } from '@angular/core'
import { Cart } from '../models/cart.model'
import { Product } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: Cart = {
    items: []
  }

  public cartItemCount = signal(0)

  public constructor() {}

  public addProduct(product: Product): void {
    const existingProduct = this.cart.items.find(item => item.product.id === product.id)

    if (existingProduct) {
      existingProduct.quantity++
    } else {
      this.cart.items.push({ product, quantity: 1 })
    }

    this.countCartItems()
  }

  public removeProduct(product: Product): void {
    const existingProduct = this.cart.items.find(item => item.product.id === product.id)

    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity--
    } else {
      this.cart.items = this.cart.items.filter(item => item.product.id !== product.id)
    }

    this.countCartItems()
  }

  public getCart(): Cart {
    return this.cart
  }

  public getTotal(): number {
    return this.cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }

  public clearCart(): void {
    this.cart = {
      items: []
    }

    this.countCartItems()
  }

  private countCartItems(): void {
    const count = this.cart.items.reduce((acc, item) => acc + item.quantity, 0)
    this.cartItemCount.set(count)
  }
}
