import { Product } from './product.model'

export interface Cart {
  items: {
    product: Product
    quantity: number
  }[]
}
