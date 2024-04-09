import { User } from './user.model'

export interface PaymentCard {
  id: number
  cardholder: string
  number: string
  expiration: string
  cvv?: string
  user: User
}
