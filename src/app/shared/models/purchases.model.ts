import { PaymentCard } from './payment-card.model'
import { PurchaseItem } from './purchase-item.model'
import { User } from './user.model'

export interface Purchase {
  id: number
  purchaseDate: Date
  total: number
  items: PurchaseItem[]
  paymentCard: PaymentCard
  user: User
}
