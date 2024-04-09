export interface CreatePurchaseRequestDto {
  products: {
    id: number
    quantity: number
  }[]
  total: number
  paymentDetails: {
    cardholder: string
    number: string
    expiration: string
    cvv: string
  }
}
