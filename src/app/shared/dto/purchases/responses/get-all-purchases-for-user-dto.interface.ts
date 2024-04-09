export interface GetAllPurchasesForUserResponseDto {
  purchases: {
    id: number
    items: {
      product: {
        id: number
        name: string
        brand: string
        color: string
        category: string
        price: number
        description: string
        imageUrl: string
      }
      quantity: number
    }[]
    total: number
    purchaseDate: Date
    paymentDetails: {
      id: number
      cardholder: string
      number: string
      expiration: string
    }
  }[]
}
