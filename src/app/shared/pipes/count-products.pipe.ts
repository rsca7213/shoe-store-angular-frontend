import { Pipe, PipeTransform } from '@angular/core'
import { Purchase } from '../models/purchases.model'

@Pipe({
  name: 'countPurchasedProducts'
})
export class CountPurchasedProductsPipe implements PipeTransform {
  public transform(purchase: Purchase): unknown {
    return purchase.items.reduce((acc, item) => acc + item.quantity, 0)
  }
}
